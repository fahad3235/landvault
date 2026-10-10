import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import { dataReady, getPlot } from '../lib/api.js';
import RiskDial from '../components/RiskDial.jsx';
import TierBadge from '../components/TierBadge.jsx';
import { gt } from '../components/govtext.js';

const TIER_TEXT = { low: 'd_low', med: 'd_med', high: 'd_high', crit: 'd_crit' };

function registryHashOf(doc) {
  if (doc.hash && doc.hash.startsWith('REGISTRY:')) {
    return doc.hash.split('/')[0].replace('REGISTRY:', '').trim();
  }
  return doc.hash || '';
}

const card = 'bg-white border border-line rounded-lg shadow-gov p-5 md:p-6';
const h2 = 'text-[1.2rem] font-bold text-ink';

export default function Dossier() {
  const { id } = useParams();
  const { lang, t } = useLang();
  const g = (k) => gt(lang, k);
  const navigate = useNavigate();
  const [data, setData] = useState(null); // null=loading, false=not found

  useEffect(() => {
    let on = true;
    setData(null);
    (async () => {
      await dataReady;
      const d = await getPlot(id);
      if (on) setData(d || false);
    })();
    return () => { on = false; };
  }, [id]);

  if (data === null) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="skeleton h-6 w-40 mb-4" />
        <div className="grid md:grid-cols-5 gap-5 mb-5">
          <div className="skeleton h-64 md:col-span-3" />
          <div className="skeleton h-64 md:col-span-2" />
        </div>
        <div className="skeleton h-40 mb-5" />
        <div className="skeleton h-40" />
        <p className="text-muted text-sm mt-4">{t('loading')}</p>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
        <p className="text-lg font-bold mb-4 text-ink">{t('plot_not_found')}</p>
        <Link to="/" className="text-gov-deep font-bold hover:underline">← {t('back')}</Link>
      </div>
    );
  }

  const p = data;
  const { score, tier, signals } = p.risk;
  const hasBreak = signals.some((s) => s.key === 'brk');
  const sevCls = { bad: 'border-l-accent', warn: 'border-l-[#B7791F]' };
  const sevW = { bad: 'text-accent', warn: 'text-[#93370D]' };

  const kv = [
    [t('d_district'), p.district],
    [t('d_upazila'), p.upazila],
    [t('d_mouza'), p.mouza],
    [t('d_dag'), p.dag],
    [t('d_khatian'), p.khatian],
    [t('d_area'), null],
    [t('d_type'), p.type],
    [t('d_owner'), p.owner],
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <span onClick={() => navigate(-1)} className="inline-block mb-3.5 text-gov-deep font-bold cursor-pointer text-[0.9rem] hover:underline">
        ← {g('back_results')}
      </span>

      {/* header: summary + risk */}
      <div className="flex gap-5 flex-wrap items-stretch mb-5">
        <div className={`${card} flex-[1.4] min-w-[280px]`}>
          <div className="text-[0.75rem] font-extrabold text-muted tracking-[1px] flex items-center gap-2 flex-wrap">
            <span className="tnum">{p.id}</span>
            <TierBadge tier={tier}>{tier.toUpperCase()} {score}</TierBadge>
          </div>
          <h2 className="text-[1.5rem] font-bold mt-1.5 text-ink">
            {p.mouza} · {t('d_dag')} {p.dag}
          </h2>
          <p className="text-muted text-[0.85rem]">{g('dossier_sub')}</p>
          <dl className="grid grid-cols-[130px_1fr] gap-x-3 gap-y-1.5 text-[0.92rem] mt-3">
            {kv.map(([k, v], i) => (
              <div key={i} className="contents">
                <dt className="text-muted font-semibold">{k}</dt>
                <dd className="font-semibold tnum text-ink">
                  {v === null ? <>{p.area} {t('d_dec')}</> : v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={`${card} flex-1 min-w-[260px] flex gap-[18px] items-center`}>
          <RiskDial score={score} tier={tier} />
          <div>
            <b className="text-[1.05rem] text-ink">{t('d_risk')}</b>
            <p className="text-[0.85rem] text-muted mt-1.5">{t(TIER_TEXT[tier])}</p>
            <p className="mt-2.5">
              <TierBadge tier={tier}>{t('d_signals_n', { n: signals.length })}</TierBadge>
            </p>
          </div>
        </div>
      </div>

      {/* signals */}
      <div className={`${card} mb-5`}>
        <h2 className={h2}>{t('d_risk')}</h2>
        {signals.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3.5">
            {signals.map((s, i) => (
              <div key={i} className={`border border-line border-l-4 ${sevCls[s.cls] || sevCls.warn} rounded-md px-4 py-3.5 bg-white`}>
                <span className={`float-right font-extrabold text-[0.95rem] tnum ${sevW[s.cls] || sevW.warn}`}>+{s.w}</span>
                <h4 className="text-[0.95rem] font-bold mb-1 pr-[52px] text-ink">{t(s.tk)}</h4>
                <p className="text-[0.83rem] text-muted">
                  {t(s.pk)}
                  {s.ex && (
                    <>
                      <br />
                      <span className="font-mono text-[0.78rem] bg-panel border border-line px-2 py-0.5 rounded break-all">{s.ex}</span>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm mt-2">{t('d_low')}</p>
        )}
      </div>

      {/* chain */}
      <div className={`${card} mb-5`}>
        <h2 className={h2}>{t('d_chain')}</h2>
        <div className="flex gap-0 mt-3.5 flex-wrap">
          {p.chain.map((c, i) => (
            <div
              key={i}
              className={`flex-1 min-w-[180px] bg-white border rounded-lg px-4 py-3.5 relative mb-6 md:mb-0 md:mr-[26px] last:mr-0 last:mb-0 ${
                hasBreak && i === p.chain.length - 1 ? 'border-accent bg-[#FDECEC]' : 'border-line'
              }`}
            >
              <div className={`text-[0.7rem] font-extrabold tracking-[1.4px] uppercase ${hasBreak && i === p.chain.length - 1 ? 'text-accent' : 'text-gov-deep'}`}>
                {c.s} · {c.yr}
              </div>
              <h4 className="text-[0.98rem] font-semibold my-1 text-ink">{c.owner}</h4>
              <div className="text-[0.8rem] text-muted">{t('d_khatian')}: {c.kh}</div>
              {i < p.chain.length - 1 && (
                <span className="absolute text-gov font-extrabold text-xl md:right-[-24px] md:top-[44%] md:left-auto left-1/2 -bottom-[26px] md:bottom-auto -translate-x-1/2 md:translate-x-0">
                  <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* mutations */}
      <div className={`${card} mb-5 overflow-x-auto gov-scroll`}>
        <h2 className={h2}>{t('d_mut')}</h2>
        <table className="w-full border-collapse text-[0.88rem] mt-3 min-w-[640px]">
          <thead>
            <tr>
              {[t('col_date'), t('col_type'), t('col_from'), t('col_to'), t('col_deed'), t('col_status')].map((h, i) => (
                <th key={i} className="text-left px-3 py-2.5 bg-panel text-muted text-[0.76rem] tracking-[0.8px] uppercase border-y border-line">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.sales.length > 0 ? p.sales.map((s, i) => (
              <tr key={i} className="hover:bg-panel">
                <td className="px-3 py-2.5 border-b border-line tnum">{s.date}</td>
                <td className="px-3 py-2.5 border-b border-line">{s.type || 'Sale'}</td>
                <td className="px-3 py-2.5 border-b border-line">{s.seller}</td>
                <td className="px-3 py-2.5 border-b border-line">{s.buyer}</td>
                <td className="px-3 py-2.5 border-b border-line">{s.deed}</td>
                <td className="px-3 py-2.5 border-b border-line">
                  {s.reg ? (
                    <span className={`text-[0.72rem] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap border ${s.mut ? 'bg-[#E7F6EC] text-[#067647] border-[#A9DFC0]' : 'bg-[#FEF6E7] text-[#93370D] border-[#F5D9A8]'}`}>
                      {s.mut ? t('st_done') : t('st_pend')}
                    </span>
                  ) : (
                    <span className="text-[0.72rem] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap bg-[#E9F1FD] text-[#1D5FBF] border border-[#B9D2F5]">Record</span>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="px-3 py-2.5 border-b border-line text-muted">—</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* documents */}
      <div className={`${card} mb-5 overflow-x-auto gov-scroll`}>
        <h2 className={h2}>{t('d_docs')}</h2>
        <table className="w-full border-collapse text-[0.88rem] mt-3 min-w-[640px]">
          <thead>
            <tr>
              {[t('col_doc'), t('col_ref'), t('col_hash'), t('col_v')].map((h, i) => (
                <th key={i} className="text-left px-3 py-2.5 bg-panel text-muted text-[0.76rem] tracking-[0.8px] uppercase border-y border-line">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.docs.map((d, i) => (
              <tr key={i} className="hover:bg-panel">
                <td className="px-3 py-2.5 border-b border-line">{d.type}</td>
                <td className="px-3 py-2.5 border-b border-line">{d.ref}</td>
                <td className="px-3 py-2.5 border-b border-line">
                  <span className="font-mono text-[0.78rem] bg-panel border border-line px-2 py-0.5 rounded break-all">
                    {d.hash.length > 26 ? d.hash.slice(0, 26) + '…' : d.hash}
                  </span>
                </td>
                <td className="px-3 py-2.5 border-b border-line whitespace-nowrap">
                  <span className={`text-[0.72rem] font-extrabold px-2.5 py-1 rounded-full border ${d.ok ? 'bg-[#E7F6EC] text-[#067647] border-[#A9DFC0]' : 'bg-[#FDECEC] text-[#D92D20] border-[#F5B8B8]'}`}>
                    {d.ok ? t('v_ok') : t('v_bad')}
                  </span>
                  {d.type === 'Deed' && (
                    <Link
                      to={`/verify?deed=${encodeURIComponent(d.ref)}&hash=${encodeURIComponent(registryHashOf(d))}`}
                      className="text-[0.78rem] font-bold text-gov-deep ml-1.5 whitespace-nowrap hover:underline"
                    >
                      {t('verify_this')} →
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* checklist */}
      <div className={`${card} mb-5`}>
        <h2 className={h2}>{t('d_flags')}</h2>
        <ul className="grid gap-2.5 mt-3 list-none">
          {(signals.length > 0 ? signals.map((s) => t(s.ck)) : [t('c_none')]).map((c, i) => (
            <li key={i} className="bg-panel border border-line rounded-md px-4 py-3 text-[0.9rem] flex gap-2.5 text-ink">
              <span className="font-extrabold text-gov-deep flex-none">☐</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div
          className="bg-panel border border-dashed border-line rounded-lg px-4 py-3.5 text-[0.84rem] text-muted mt-4"
          dangerouslySetInnerHTML={{ __html: t('disc') }}
        />
      </div>
    </div>
  );
}
