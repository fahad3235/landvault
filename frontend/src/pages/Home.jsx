import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import { dataReady, searchPlots, getStats } from '../lib/api.js';
import TierBadge from '../components/TierBadge.jsx';
import Overview from '../components/Overview.jsx';
import NoticeBoard from '../components/NoticeBoard.jsx';
import Verifier from '../components/Verifier.jsx';
import { gt } from '../components/govtext.js';

const DEMO_CASES = [
  { id: 'SV-001', key: 'sc_clean' },
  { id: 'SV-007', key: 'sc_double' },
  { id: 'SV-009', key: 'sc_forge' },
];

const TABS = [
  { key: 'dag', field: 'dag' },
  { key: 'khatian', field: 'khatian' },
  { key: 'mouza', field: 'mouza' },
  { key: 'owner', field: 'owner' },
];

export default function Home() {
  const { lang, t } = useLang();
  const g = (k) => gt(lang, k);
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('dag');
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

  // Tab-scoped post-filter: the active tab narrows results to its own field.
  const tabField = TABS.find((x) => x.key === tab)?.field;
  const filtered =
    results && q.trim() !== '' && tabField
      ? results.plots.filter((p) => String(p[tabField] || '').toLowerCase().includes(q.trim().toLowerCase()))
      : results?.plots || [];

  const showResults = touched && (q.trim() !== '' || tier !== null);
  const countText = results
    ? tier
      ? t('tier_count', { a: filtered.length, b: results.total, t: t('ov_' + tier) })
      : q.trim() === ''
        ? t('browse_count', { a: filtered.length, b: results.total })
        : t('res_count', { a: filtered.length, b: results.total })
    : '';

  const steps = [g('step1'), g('step2'), g('step3')];

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      {/* HERO BANNER */}
      <div
        className="rounded-lg mt-4 px-6 py-8 md:px-10 md:py-10 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(120deg,#014D38 0%,#006A4E 55%,#2E8B6E 100%)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between relative z-10">
          <h1 className="text-[1.65rem] md:text-[2.1rem] leading-[1.25] font-bold max-w-[560px]">
              {g('hero_bn')}
              <br />
              <span className="font-semibold">{g('hero_en')}</span>
          </h1>
          <div className="flex items-center gap-1.5 flex-wrap">
            {steps.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/60 font-bold">→</span>}
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.9rem] font-bold whitespace-nowrap ${
                    i === 0 ? 'bg-white text-gov-deep' : 'border border-white/70 text-white'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.8rem] font-extrabold ${
                      i === 0 ? 'bg-gov text-white' : 'border border-white/70'
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-5 mt-5 items-start">
        {/* LEFT COLUMN */}
        <div className="min-w-0">
          {/* SEARCH PANEL */}
          <section className="bg-white border border-line rounded-lg shadow-gov p-5 md:p-6">
            <div className="flex gap-2 flex-wrap" role="tablist" aria-label="search field">
              {TABS.map((tb) => (
                <button
                  key={tb.key}
                  role="tab"
                  aria-selected={tab === tb.key}
                  onClick={() => { setTab(tb.key); setTouched(true); if (q.trim() || tier) runSearch(q, tier); }}
                  className={`px-4 py-2 rounded-md text-[0.95rem] font-bold border transition ${
                    tab === tb.key
                      ? 'border-gov text-gov-deep bg-gov-soft'
                      : 'border-line text-ink bg-white hover:border-gov'
                  }`}
                >
                  {g('tab_' + tb.key)}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="mt-3.5 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="9" r="6" /><path d="M13.5 13.5L17 17" strokeLinecap="round" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => onType(e.target.value)}
                  placeholder={g('tab_ph_' + tab)}
                  className="w-full border border-line rounded-md pl-11 pr-3.5 py-3 text-[1rem] text-ink outline-none focus:border-gov focus:ring-2 focus:ring-gov-soft"
                />
              </div>
              <button
                type="submit"
                className="bg-gov hover:bg-gov-deep text-white font-bold text-[1rem] px-8 py-3 rounded-md transition whitespace-nowrap inline-flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="9" cy="9" r="6" /><path d="M13.5 13.5L17 17" strokeLinecap="round" />
                </svg>
                {t('search_btn')}
              </button>
            </form>
            <p className="text-muted text-[0.88rem] mt-2.5">{g('search_help')}</p>
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-muted text-[0.85rem] font-semibold">{t('try')}</span>
              {DEMO_CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/plot/${c.id}`)}
                  className="border border-line text-ink rounded-full px-3.5 py-1.5 text-[0.83rem] font-bold hover:border-gov hover:text-gov-deep transition bg-white"
                >
                  {t(c.key)}
                </button>
              ))}
            </div>
          </section>

          {/* RESULTS TABLE */}
          {showResults && (
            <section className="bg-white border border-line rounded-lg shadow-gov p-5 md:p-6 mt-5">
              <h2 className="text-[1.2rem] font-bold text-ink">
                {tier ? `${t('ov_' + tier)} — ${g('results_h')}` : g('results_h')}
              </h2>
              <p className="text-muted text-[0.9rem] mb-3">{countText}</p>
              {filtered.length > 0 ? (
                <div className="overflow-x-auto gov-scroll -mx-1 px-1">
                  <table className="w-full text-[0.92rem] min-w-[620px] border-collapse">
                    <thead>
                      <tr className="border-b-2 border-line text-left">
                        {[g('col_plot'), g('col_mouza'), g('col_dag'), g('col_owner'), g('col_risk')].map((h, i) => (
                          <th key={i} className="py-2.5 pr-4 text-muted font-bold text-[0.78rem] uppercase tracking-[0.6px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p) => (
                        <tr
                          key={p.id}
                          onClick={() => navigate(`/plot/${p.id}`)}
                          className="border-b border-line hover:bg-panel cursor-pointer transition last:border-b-0"
                        >
                          <td className="py-3 pr-4 font-bold text-gov-deep whitespace-nowrap">{p.id}</td>
                          <td className="py-3 pr-4 text-ink">{p.mouza}</td>
                          <td className="py-3 pr-4 tnum text-ink whitespace-nowrap">{p.dag}</td>
                          <td className="py-3 pr-4 text-ink">{p.owner}</td>
                          <td className="py-3 pr-4">
                            <TierBadge tier={p.tier}>{t('ov_' + p.tier)}</TierBadge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-sm">{t('nores')}</p>
              )}
            </section>
          )}

          {/* DEED VERIFIER */}
          <section id="verifier" className="bg-white border border-line rounded-lg shadow-gov p-5 md:p-6 mt-5">
            <h2 className="text-[1.2rem] font-bold text-ink">{t('ver_h')}</h2>
            <p className="text-muted text-[0.9rem] mb-4">{t('ver_p')}</p>
            <Verifier />
          </section>

          {/* HOW IT WORKS */}
          <section className="bg-white border border-line rounded-lg shadow-gov p-5 md:p-6 mt-5">
            <h2 className="text-[1.2rem] font-bold text-ink">{g('how_h_gov')}</h2>
            <p className="text-muted text-[0.9rem] mb-4">{t('how_p')}</p>
            <ol className="grid gap-4 md:grid-cols-3 list-none">
              {[
                { n: '1', h: 's1h', p: 's1p' },
                { n: '2', h: 's2h', p: 's2p' },
                { n: '3', h: 's3h', p: 's3p' },
              ].map((s) => (
                <li key={s.n} className="border border-line rounded-lg p-4 bg-white">
                  <div className="w-8 h-8 rounded-full bg-gov text-white font-extrabold flex items-center justify-center mb-2.5 text-[0.95rem]">
                    {s.n}
                  </div>
                  <h4 className="font-bold text-ink mb-1">{t(s.h)}</h4>
                  <p className="text-[0.86rem] text-muted">{t(s.p)}</p>
                </li>
              ))}
            </ol>
            <div
              className="bg-panel border border-dashed border-line rounded-lg px-4 py-3.5 text-[0.84rem] text-muted mt-4"
              dangerouslySetInnerHTML={{ __html: t('disc') }}
            />
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="flex flex-col gap-5 min-w-0">
          <Overview stats={stats} tier={tier} onTier={onTier} />
          <NoticeBoard />
        </aside>
      </div>
    </div>
  );
}
