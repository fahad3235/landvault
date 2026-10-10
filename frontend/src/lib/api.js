import { useEffect, useState } from 'react';
import { PLOTS, DEED_INDEX, assess, SIGNAL_META } from './registry.js';

/**
 * Data layer: talks to the FastAPI backend when reachable, otherwise falls back
 * to the offline synthetic registry (same seeded generator as the Phase-1 MVP).
 * All functions return normalized shapes so the UI never cares which mode is on.
 */
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

let mode = 'unknown'; // 'api' | 'offline'
const listeners = new Set();
function setMode(m) {
  if (mode !== m) { mode = m; listeners.forEach((f) => f(m)); }
}
export function getMode() { return mode; }
export function useMode() {
  const [m, setM] = useState(mode);
  useEffect(() => { const off = onModeChange(setM); return off; }, []);
  return m;
}
function onModeChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

async function probe() {
  try {
    const c = new AbortController();
    const to = setTimeout(() => c.abort(), 2500);
    const r = await fetch(`${API_URL}/api/health`, { signal: c.signal });
    clearTimeout(to);
    setMode(r.ok ? 'api' : 'offline');
  } catch {
    setMode('offline');
  }
}
/** Resolves once the API reachability probe has finished. */
export const dataReady = probe();

async function apiGet(path) {
  const c = new AbortController();
  const to = setTimeout(() => c.abort(), 8000);
  try {
    const r = await fetch(API_URL + path, { signal: c.signal });
    clearTimeout(to);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch (e) {
    clearTimeout(to);
    throw e;
  }
}

/** Normalize an API signal to the local key-based shape. */
function toSignal(s) {
  const meta = SIGNAL_META[s.key] || { tk: s.key, pk: '', ck: '', cls: 'warn' };
  return { key: s.key, w: s.weight, tk: meta.tk, pk: meta.pk, ex: s.evidence || '', ck: meta.ck, cls: meta.cls };
}

function withScore(p) {
  if (p.score !== undefined && p.tier) return p;
  const a = assess(p);
  return { ...p, score: a.score, tier: a.tier };
}

function localSearch(q, tier) {
  const query = (q || '').trim().toLowerCase();
  let hits = query
    ? PLOTS.filter((p) => {
        const hay = [p.id, p.dag, p.khatian, p.owner, p.mouza, p.upazila, p.district, p.type]
          .concat(p.chain.map((c) => c.kh))
          .concat(p.docs.map((d) => d.ref))
          .join(' ')
          .toLowerCase();
        return query.split(/\s+/).every((tok) => hay.includes(tok));
      })
    : PLOTS.slice();
  if (tier) hits = hits.filter((p) => assess(p).tier === tier);
  return hits;
}

/**
 * Search plots. Returns { plots, total } — plots are capped at `limit`.
 * Empty q = browse mode (first N plots).
 */
export async function searchPlots(q, tier = null, limit = 24) {
  if (mode === 'api') {
    try {
      const fetchLimit = tier ? 10000 : limit * 4;
      const params = new URLSearchParams({ q: q || '', limit: String(fetchLimit) });
      const arr = await apiGet(`/api/plots/search?${params}`);
      let plots = Array.isArray(arr) ? arr : [];
      if (tier) plots = plots.filter((p) => p.tier === tier);
      return { plots: plots.slice(0, limit), total: plots.length };
    } catch { /* fall through to offline */ }
  }
  const hits = localSearch(q, tier);
  return { plots: hits.slice(0, limit).map(withScore), total: hits.length };
}

/** Full dossier for one plot, or null when not found. */
export async function getPlot(id) {
  if (mode === 'api') {
    try {
      const d = await apiGet(`/api/plots/${encodeURIComponent(id)}`);
      return {
        ...d,
        risk: { score: d.risk.score, tier: d.risk.tier, signals: d.risk.signals.map(toSignal) },
      };
    } catch { /* fall through */ }
  }
  const p = PLOTS.find((x) => x.id === id);
  if (!p) return null;
  const a = assess(p);
  return { ...p, risk: { score: a.score, tier: a.tier, signals: a.sigs } };
}

/** { total, tiers: {low, med, high, crit} } */
export async function getStats() {
  if (mode === 'api') {
    try {
      const s = await apiGet('/api/registry/stats');
      return { total: s.total, tiers: s.tiers };
    } catch { /* fall through */ }
  }
  const tiers = { low: 0, med: 0, high: 0, crit: 0 };
  for (const p of PLOTS) tiers[assess(p).tier]++;
  return { total: PLOTS.length, tiers };
}

/**
 * Verify a deed hash. Returns { found, match, deedNo, registryHash, plotId }.
 */
export async function verifyDeed(deedNo, presentedHash) {
  const deed = (deedNo || '').trim();
  const hash = (presentedHash || '').trim().toLowerCase();
  if (mode === 'api') {
    try {
      const r = await fetch(`${API_URL}/api/deeds/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deed_no: deed, presented_hash: hash }),
      });
      if (r.ok) {
        const d = await r.json();
        return {
          found: d.found, match: d.match, deedNo: d.deed_no || deed,
          registryHash: d.registry_hash || '', plotId: d.plot_id || '',
        };
      }
    } catch { /* fall through */ }
  }
  const rec = DEED_INDEX[deed];
  if (!rec) return { found: false, match: false, deedNo: deed, registryHash: '', plotId: '' };
  return {
    found: true,
    match: rec.hash.toLowerCase() === hash,
    deedNo: deed, registryHash: rec.hash, plotId: rec.plot,
  };
}

/** Registry hash for a deed (used by the tamper demo). '' when unknown. */
export async function getRegistryHash(deedNo) {
  const deed = (deedNo || '').trim();
  if (mode === 'api') {
    try {
      const v = await verifyDeed(deed, '');
      return v.found ? v.registryHash : '';
    } catch { return ''; }
  }
  const rec = DEED_INDEX[deed];
  return rec ? rec.hash : '';
}

export function tamperHash(h) {
  if (!h) return h;
  return h.slice(0, -1) + (h.slice(-1) === 'a' ? 'b' : 'a');
}

export { API_URL };
