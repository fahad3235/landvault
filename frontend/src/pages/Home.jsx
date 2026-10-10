import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import { dataReady, searchPlots, getStats } from '../lib/api.js';
import PlotCard from '../components/PlotCard.jsx';
import Overview from '../components/Overview.jsx';
import Verifier from '../components/Verifier.jsx';

const DEMO_CASES = [
  { id: 'SV-001', key: 'sc_clean' },
  { id: 'SV-007', key: 'sc_double' },
  { id: 'SV-009', key: 'sc_forge' },
];

export default function Home() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tier, setTier] = useState(null);
  const [results, setResults] = useState(null); // {plots,total} | null
  const [stats, setStats] = useState(null);
  const [touched, setTouched] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    let on = true;
    (async () => {
      await dataReady;
      if (on) setStats(await getStats());
    })();
    return () => { on = false; };
  }, []);

  const runSearch = async (query, tr) => {
    await dataReady;
    const r = await searchPlots(query, tr, 24);
    setResults(r);
  };

  const onType = (v) => {
    setQ(v);
    setTouched(true);
    clearTimeout(timer.current);
    if (!v.trim() && !tier) {
      setResults(null);
      return;
    }
    timer.current = setTimeout(() => runSearch(v, tier), 280);
  };

  const onTier = (k) => {
    const next = tier === k ? null : k;
    setTier(next);
    setTouched(true);
    runSearch(q, next);
  };

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    clearTimeout(timer.current);
    runSearch(q, tier);
  };

  const showResults = touched && (q.trim() !== '' || tier !== null);
  const countText = results
    ? tier
      ? t('tier_count', { a: results.plots.length, b: results.total, t: t('ov_' + tier) })
      : q.trim() === ''
        ? t('browse_count', { a: results.plots.length, b: results.total })
        : t('res_count', { a: results.plots.length, b: results.total })
    : '';

  return (
    <>
      {/* HERO */}
      <div className="max-w-[1120px] mx-auto px-5">
        <div
          className="rounded-[22px] mt-6 px-6 py-10 md:px-10 md:py-[52px] relative overflow-hidden text-white shadow-[0_8px_28px_rgba(20,45,32,0.08)]"
          style={{ background: 'linear-gradient(160deg,#0A4A34 0%,#0E6B4A 60%,#12805A 100%)' }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ right: -70, top: -70, width: 340, height: 340, border: '46px solid rgba(255,255,255,.07)' }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ right: 60, bottom: -110, width: 220, height: 220, border: '30px solid rgba(201,162,39,.16)' }}
          />
          <h1
            className="text-[1.7rem] md:text-[2.35rem] leading-[1.18] max-w-[640px] relative z-10 font-bold"
            dangerouslySetInnerHTML={{ __html: t('hero_h').replace('<span class="hl">', '<span style="color:#FFD84D">').replace('</span>', '</span>') }}
          />
          <p className="mt-3.5 mb-6 max-w-[600px] text-[#DCEBE2] relative z-10">{t('hero_p')}</p>

          <form onSubmit={submit} className="relative z-10">
            <div className="flex flex-col md:flex-row gap-2.5 max-w-[640px] bg-white rounded-[14px] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <input
                value={q}
                onChange={(e) => onType(e.target.value)}
                placeholder={t('search_ph')}
                className="flex-1 min-w-0 border-0 outline-0 text-base px-3.5 py-3 rounded-lg text-ink bg-transparent"
              />
              <button
                type="submit"
                className="bg-gold text-[#231a03] font-extrabold text-[0.95rem] px-6 py-3 rounded-[10px] whitespace-nowrap hover:brightness-105 transition"
              >
                {t('search_btn')}
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap gap-2.5 relative z-10 items-center">
            <span className="text-[#CFE3D6] text-[0.85rem] font-semibold">{t('try')}</span>
            {DEMO_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/plot/${c.id}`)}
                className="bg-white/10 border border-white/30 text-white rounded-full px-4 py-2 text-[0.85rem] font-bold hover:bg-white/25 transition"
              >
                {t(c.key)}
              </button>
            ))}
          </div>

          <div className="flex gap-6 mt-6 relative z-10 flex-wrap">
            <div><b className="text-2xl tnum block">{stats ? stats.total : '…'}</b><span className="text-[0.8rem] text-[#CFE3D6]">{t('st1')}</span></div>
            <div><b className="text-2xl tnum block">4</b><span className="text-[0.8rem] text-[#CFE3D6]">{t('st2')}</span></div>
            <div><b className="text-2xl tnum block">6</b><span className="text-[0.8rem] text-[#CFE3D6]">{t('st3')}</span></div>
            <div><b className="text-2xl tnum block">0–100</b><span className="text-[0.8rem] text-[#CFE3D6]">{t('st4')}</span></div>
          </div>
        </div>

        {/* RESULTS */}
        {showResults && (
          <section className="my-8">
            <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6">
              <h2 className="text-xl font-bold">{tier ? t('ov_' + tier) + ' — ' + t('res_h') : t('res_h')}</h2>
              <p className="text-muted text-[0.93rem] mb-4">{countText}</p>
              {results && results.plots.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.plots.map((p) => (
                    <PlotCard key={p.id} plot={p} />
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm">{t('nores')}</p>
              )}
            </div>
          </section>
        )}

        {/* REGISTRY OVERVIEW */}
        <Overview stats={stats} tier={tier} onTier={onTier} />

        {/* DEED VERIFIER */}
        <section id="verifier" className="my-8">
          <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6">
            <h2 className="text-xl font-bold">{t('ver_h')}</h2>
            <p className="text-muted text-[0.93rem] mb-4">{t('ver_p')}</p>
            <Verifier />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="my-8">
          <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6">
            <h2 className="text-xl font-bold">{t('how_h')}</h2>
            <p className="text-muted text-[0.93rem] mb-4">{t('how_p')}</p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { n: '1', h: 's1h', p: 's1p' },
                { n: '2', h: 's2h', p: 's2p' },
                { n: '3', h: 's3h', p: 's3p' },
              ].map((s) => (
                <div key={s.n} className="bg-white border border-line rounded-xl p-5">
                  <div className="w-[34px] h-[34px] rounded-full bg-em text-white font-extrabold flex items-center justify-center mb-2.5">
                    {s.n}
                  </div>
                  <h4 className="font-bold mb-1.5">{t(s.h)}</h4>
                  <p className="text-[0.87rem] text-muted">{t(s.p)}</p>
                </div>
              ))}
            </div>
            <div
              className="bg-[#FFF8E6] border border-dashed border-gold rounded-xl px-4 py-4 text-[0.85rem] text-[#6B5A1E] mt-4"
              dangerouslySetInnerHTML={{ __html: t('disc') }}
            />
          </div>
        </section>
      </div>
    </>
  );
}
