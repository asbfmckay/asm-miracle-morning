/*
 * Miracle Morning (Life App) — API Worker  ("life-api")
 *
 * Saves the app's data, handles sign-in, and lets the household share what is shared.
 * WORKER_VERSION should match APP_VERSION in index.html.
 *
 * Changelog
 * v3.5.0 (2026-11-10) — Health & Fitness link. Andrew: "integrate seamlessly the health & fitness app".
 *   - GET /hf/summary (Andrew only): fetches the Health & Fitness worker's read-only GET /summary
 *     (weigh-ins, workouts, food-logged days, today's watch figures, targets) using the HF_READ_KEY secret.
 *     HF_URL var = that worker's address. The phone never holds a Health & Fitness key.
 * v3.1.0 (2026-11-09) — PIN sign-in with two fixed profiles. Andrew: "Can we just change this to a simple
 *   pin number to login? And have a profile for me (andrew.mckay92@gmail.com) and profile for Bronnia
 *   (andrew.bronnia@gmail.com)".
 *   - Profiles are listed in PROFILES below. Each PIN is a Cloudflare secret: PIN_ANDREW, PIN_BRONNIA
 *     (4–8 digits). Email + password sign-in removed.
 *   - 5 wrong PINs on a profile locks that profile for 15 minutes (and 10 from one connection).
 *   - The owner (Andrew) may bring across Folio habit ticks for Bronnia when importing.
 * v3.0.0 (2026-11-09) — Phase 1 of the Life App spec. First version.
 *   - Two kinds of space: "hh" (the household — goals, habits, habit ticks, family notes) and
 *     "u:<uid>" (one person's own — morning log, Scribing, reviews, settings). Nobody else can read
 *     a "u:" space.
 *   - In "hh", a habit can only be changed by its owner, and habit ticks only by the person ticking.
 *     Goals are shared and anyone in the household can edit them.
 *   - Sync is per item, newest `updatedAt` wins. Deletes are kept as tombstones.
 *   - A daily snapshot of each space is kept (last 14) as a safety net.
 */
const WORKER_VERSION = '3.5.0';

// The household. `pin` names the secret that holds that person's PIN.
const PROFILES = [
  { uid: 'andrew', name: 'Andrew', email: 'andrew.mckay92@gmail.com', role: 'owner', pin: 'PIN_ANDREW' },
  { uid: 'bronnia', name: 'Bronnia', email: 'andrew.bronnia@gmail.com', role: 'member', pin: 'PIN_BRONNIA' },
];

const SESSION_DAYS = 365;
const OWNED_TYPES = { habit: 'owner', hm: 'uid', famnote: 'owner' }; // field that says who may change it

export default {
  async fetch(req, env) {
    const cors = corsHeaders(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(req.url);
    try {
      if (url.pathname === '/health') {
        return json({ ok: true, version: WORKER_VERSION, pins: PROFILES.map(p => ({ name: p.name, set: !!env[p.pin] })) }, 200, cors);
      }
      if (url.pathname === '/profiles' && req.method === 'GET') return json({ people: PROFILES.map(pub) }, 200, cors);
      if (url.pathname === '/auth/pin' && req.method === 'POST') return pinLogin(req, env, cors);

      const s = await session(req, env);
      const me = s && PROFILES.find(p => p.uid === s.uid);
      if (!me) return json({ error: 'Please sign in again.' }, 401, cors);

      if (url.pathname === '/me' && req.method === 'GET') return json({ user: pub(me), people: PROFILES.map(pub) }, 200, cors);
      if (url.pathname === '/auth/logout' && req.method === 'POST') { await env.DB.delete('sess:' + s.token); return json({ ok: true }, 200, cors); }

      if (url.pathname === '/hf/summary' && req.method === 'GET') {
        if (me.uid !== 'andrew') return json({ error: 'Not linked for this profile.' }, 403, cors);
        if (!env.HF_URL || !env.HF_READ_KEY) return json({ error: 'Health & Fitness link not set up yet.' }, 503, cors);
        const r = await fetch(env.HF_URL.replace(/\/$/, '') + '/summary', { headers: { Authorization: 'Bearer ' + env.HF_READ_KEY } });
        const body = await r.text();
        if (!r.ok) return json({ error: 'Health & Fitness said ' + r.status }, 502, cors);
        return new Response(body, { status: 200, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
      }
      if (url.pathname === '/sync' && req.method === 'GET') {
        const since = +url.searchParams.get('since') || 0, now = Date.now(), items = [];
        for (const sp of spacesFor(me)) {
          const st = await loadSpace(env, sp);
          for (const it of Object.values(st.items)) if ((it._srv || 0) > since) items.push(it);
        }
        return json({ items, now }, 200, cors);
      }
      if (url.pathname === '/sync' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        const incoming = Array.isArray(b.items) ? b.items.slice(0, 2000) : [];
        const allowed = spacesFor(me), bySpace = {}, refused = [];
        for (const it of incoming) {
          if (!it || typeof it.id !== 'string' || !it.type || !allowed.includes(it.space)) { refused.push(it && it.id); continue; }
          (bySpace[it.space] = bySpace[it.space] || []).push(it);
        }
        const now = Date.now(); let accepted = 0;
        for (const [sp, list] of Object.entries(bySpace)) {
          const st = await loadSpace(env, sp); let changed = false;
          for (const it of list) {
            const old = st.items[it.id];
            if (old && (old.updatedAt || 0) >= (it.updatedAt || 0)) continue;     // ours is newer or same
            if (sp === 'hh' && OWNED_TYPES[it.type]) {
              const f = OWNED_TYPES[it.type];
              const who = old ? old[f] : it[f];
              // Owner importing from Folio may write ticks for someone else (only when creating them).
              const ownerImport = me.role === 'owner' && it.type === 'hm' && (it.imp === true || String(who).startsWith('folio:')) && (!old || String(who).startsWith('folio:'));
              if (who && who !== me.uid && !ownerImport) { refused.push(it.id); continue; }
            }
            st.items[it.id] = Object.assign({}, it, { _srv: now, _by: me.uid });
            changed = true; accepted++;
          }
          if (changed) { await snapshot(env, sp, st); await env.DB.put('space:' + sp, JSON.stringify(st)); }
        }
        return json({ ok: true, accepted, refused: refused.filter(Boolean), now }, 200, cors);
      }
      return json({ error: 'Not found' }, 404, cors);
    } catch (e) {
      return json({ error: 'Something went wrong on the server.', detail: String(e && e.message || e) }, 500, cors);
    }
  },
};

/* ---------------- sign-in ---------------- */
async function pinLogin(req, env, cors) {
  const b = await req.json().catch(() => ({}));
  const p = PROFILES.find(x => x.uid === b.uid), pin = String(b.pin || '').trim();
  if (!p) return json({ error: 'Pick your profile.' }, 400, cors);
  const want = String(env[p.pin] || '').trim();
  if (!/^\d{4,8}$/.test(want)) return json({ error: p.name + "'s PIN hasn't been set up yet." }, 400, cors);
  const ip = req.headers.get('CF-Connecting-IP') || 'x', fk = 'fail:' + p.uid, ik = 'failip:' + ip;
  const fails = +(await env.DB.get(fk)) || 0, ipFails = +(await env.DB.get(ik)) || 0;
  if (fails >= 5 || ipFails >= 10) return json({ error: 'Too many wrong PINs. Wait 15 minutes and try again.' }, 429, cors);
  if (!safeEq(pin, want)) {
    await env.DB.put(fk, String(fails + 1), { expirationTtl: 900 });
    await env.DB.put(ik, String(ipFails + 1), { expirationTtl: 900 });
    return json({ error: 'Wrong PIN.' + (fails >= 2 ? ' ' + (4 - fails) + ' tries left.' : '') }, 401, cors);
  }
  await env.DB.delete(fk);
  const token = rand(32);
  await env.DB.put('sess:' + token, JSON.stringify({ uid: p.uid, created: Date.now() }), { expirationTtl: SESSION_DAYS * 86400 });
  return json({ token, user: pub(p), people: PROFILES.map(pub) }, 200, cors);
}

async function session(req, env) {
  const h = req.headers.get('Authorization') || '';
  const token = h.startsWith('Bearer ') ? h.slice(7).trim() : '';
  if (!token || token.length < 20) return null;
  const s = await env.DB.get('sess:' + token, 'json');
  return s ? Object.assign(s, { token }) : null;
}
const pub = u => ({ uid: u.uid, email: u.email, name: u.name, role: u.role });
const spacesFor = u => ['hh', 'u:' + u.uid];

/* ---------------- storage ---------------- */
async function loadSpace(env, sp) {
  const st = await env.DB.get('space:' + sp, 'json');
  return st && st.items ? st : { items: {} };
}
// Once a day per space, keep a copy before the first change of the day. Last 14 kept.
async function snapshot(env, sp, st) {
  const day = new Date().toISOString().slice(0, 10), key = 'snap:' + sp + ':' + day;
  if (await env.DB.get(key)) return;
  await env.DB.put(key, JSON.stringify(st), { expirationTtl: 14 * 86400 });
}

/* ---------------- helpers ---------------- */
function corsHeaders(req, env) {
  const origin = req.headers.get('Origin') || '';
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const ok = allowed.includes(origin) || (env.ALLOW_LOCALHOST === 'true' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin));
  return {
    'Access-Control-Allow-Origin': ok ? origin : (allowed[0] || ''),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
function rand(n) { const a = crypto.getRandomValues(new Uint8Array(n)); return Array.from(a, x => x.toString(16).padStart(2, '0')).join('').slice(0, n * 2); }
function safeEq(a, b) { a = String(a); b = String(b); if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
