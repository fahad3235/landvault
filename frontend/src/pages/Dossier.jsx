import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import { dataReady, getPlot } from '../lib/api.js';
import RiskDial from '../components/RiskDial.jsx';
import TierBadge from '../components/TierBadge.jsx';

const TIER_TEXT = { low: 'd_low', med: 'd_med', high: 'd_high', crit: 'd_crit' };

function registryHashOf(doc) {
  if (doc.hash && doc.hash.startsWith('REGISTRY:')) {
    return doc.hash.split('/')[0].replace('REGISTRY:', '').trim();
  }
  return doc.hash || '';
}

export default function Dossier() {
  const { id } = useParams();
  const { t } = useLang();
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
      <div className="max-w-[1120px] mx-auto px-5 py-8">
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
      <div className="max-w-[1120px] mx-auto px-5 py-16 text-center">
        <p className="text-lg font-bold mb-4">{t('plot_not_found')}</p>
        <Link to="/" className="text-em font-bold hover:underline">← {t('back')}</Link>
      </div>
    );
  }

  const p = data;
  const { score, tier, signals } = p.risk;
  const hasBreak = signals.some((s) => s.key === 'brk');
  const sevCls = { bad: 'border-l-[#E0483A]', warn: 'border-l-[#E0A020]' };
  const sevW = { bad: 'text-[#E0483A]', warn: 'text-[#E0A020]' };

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
    <div className="max-w-[1120px] mx-auto px-5 py-6">
      <span onClick={() => navigate(-1)} className="inline-block mb-3.5 text-em font-bold cursor-pointer text-[0.9rem] hover:underline">
        ← {t('back')}
      </span>

      {/* header: summary + risk */}
      <div className="flex gap-5 flex-wrap items-stretch mb-5">
        <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 flex-[1.4] min-w-[280px]">
          <div className="text-[0.75rem] font-extrabold text-muted tracking-[1px]">
            {p.id} · <TierBadge tier={tier}>{tier.toUpperCase()} {score}</TierBadge>
          </div>
          <h2 className="text-2xl font-bold mt-1.5">
            {p.mouza} · {t('d_dag')} {p.dag}
          </h2>
          <dl className="grid grid-cols-[130px_1fr] gap-x-3 gap-y-1.5 text-[0.92rem] mt-3">
            {kv.map(([k, v], i) => (
              <div key={i} className="contents">
                <dt className="text-muted font-semibold">{k}</dt>
                <dd className="font-semibold tnum">
                  {v === null ? <>{p.area} {t('d_dec')}</> : v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="flex-1 min-w-[260px] rounded-2xl p-6 flex gap-[18px] items-center text-white"
          style={{ background: 'linear-gradient(150deg,#10261C,#0E6B4A)' }}
        >
          <RiskDial score={score} tier={tier} />
          <div>
            <b className="text-[1.05rem]">{t('d_risk')}</b>
            <p className="text-[0.85rem] text-[#CFE3D6] mt-1.5">{t(TIER_TEXT[tier])}</p>
            <p className="mt-2.5">
              <TierBadge tier={tier}>{t('d_signals_n', { n: signals.length })}</TierBadge>
            </p>
          </div>
        </div>
      </div>

      {/* signals */}
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5">
        <h2 className="text-xl font-bold">{t('d_risk')}</h2>
        {signals.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3.5">
            {signals.map((s, i) => (
              <div key={i} className={`border border-line border-l-[5px] ${sevCls[s.cls] || sevCls.warn} rounded-[10px] px-4 py-3.5 bg-white`}>
                <span className={`float-right font-extrabold text-[0.95rem] tnum ${sevW[s.cls] || sevW.warn}`}>+{s.w}</span>
                <h4 className="text-[0.95rem] font-bold mb-1 pr-[52px]">{t(s.tk)}</h4>
                <p className="text-[0.83rem] text-muted">
                  {t(s.pk)}
                  {s.ex && (
                    <>
                      <br />
                      <span className="font-mono text-[0.78rem] bg-[#F1F5F0] px-2 py-0.5 rounded-md break-all">{s.ex}</span>
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
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5">
        <h2 className="text-xl font-bold">{t('d_chain')}</h2>
        <div className="flex gap-0 mt-3.5 flex-wrap">
          {p.chain.map((c, i) => (
            <div
              key={i}
              className={`flex-1 min-w-[180px] bg-white border rounded-xl px-4 py-3.5 relative mb-6 md:mb-0 md:mr-[26px] last:mr-0 last:mb-0 ${
                hasBreak && i === p.chain.length - 1 ? 'border-danger bg-[#FBEDEA]' : 'border-line'
              }`}
            >
              <div className={`text-[0.7rem] font-extrabold tracking-[1.4px] uppercase ${hasBreak && i === p.chain.length - 1 ? 'text-danger' : 'text-em'}`}>
                {c.s} · {c.yr}
              </div>
              <h4 className="text-[0.98rem] font-semibold my-1">{c.owner}</h4>
              <div className="text-[0.8rem] text-muted">{t('d_khatian')}: {c.kh}</div>
              {i < p.chain.length - 1 && (
                <span className="absolute text-gold font-extrabold text-xl md:right-[-24px] md:top-[44%] md:left-auto left-1/2 -bottom-[26px] md:bottom-auto -translate-x-1/2 md:translate-x-0">
                  <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* mutations */}
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5 overflow-x-auto">
        <h2 className="text-xl font-bold">{t('d_mut')}</h2>
        <table className="w-full border-collapse text-[0.88rem] mt-3 min-w-[640px]">
          <thead>
            <tr>
              {[t('col_date'), t('col_type'), t('col_from'), t('col_to'), t('col_deed'), t('col_status')].map((h, i) => (
                <th key={i} className="text-left px-3 py-2.5 bg-[#F1F5F0] text-muted text-[0.76rem] tracking-[0.8px] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.sales.length > 0 ? p.sales.map((s, i) => (
              <tr key={i} className="hover:bg-[#FAFCF9]">
                <td className="px-3 py-2.5 border-t border-line tnum">{s.date}</td>
                <td className="px-3 py-2.5 border-t border-line">{s.type || 'Sale'}</td>
                <td className="px-3 py-2.5 border-t border-line">{s.seller}</td>
                <td className="px-3 py-2.5 border-t border-line">{s.buyer}</td>
                <td className="px-3 py-2.5 border-t border-line">{s.deed}</td>
                <td className="px-3 py-2.5 border-t border-line">
                  {s.reg ? (
                    <span className={`text-[0.72rem] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap ${s.mut ? 'bg-em-soft text-em-deep' : 'bg-[#FBF3DF] text-[#9A6B14]'}`}>
                      {s.mut ? t('st_done') : t('st_pend')}
                    </span>
                  ) : (
                    <span className="text-[0.72rem] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap bg-[#E9F1FD] text-[#1D5FBF]">Record</span>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="px-3 py-2.5 border-t border-line text-muted">—</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* documents */}
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5 overflow-x-auto">
        <h2 className="text-xl font-bold">{t('d_docs')}</h2>
        <table className="w-full border-collapse text-[0.88rem] mt-3 min-w-[640px]">
          <thead>
            <tr>
              {[t('col_doc'), t('col_ref'), t('col_hash'), t('col_v')].map((h, i) => (
                <th key={i} className="text-left px-3 py-2.5 bg-[#F1F5F0] text-muted text-[0.76rem] tracking-[0.8px] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.docs.map((d, i) => (
              <tr key={i} className="hover:bg-[#FAFCF9]">
                <td className="px-3 py-2.5 border-t border-line">{d.type}</td>
                <td className="px-3 py-2.5 border-t border-line">{d.ref}</td>
                <td className="px-3 py-2.5 border-t border-line">
                  <span className="font-mono text-[0.78rem] bg-[#F1F5F0] px-2 py-0.5 rounded-md break-all">
                    {d.hash.length > 26 ? d.hash.slice(0, 26) + '…' : d.hash}
                  </span>
                </td>
                <td className="px-3 py-2.5 border-t border-line whitespace-nowrap">
                  <span className={`text-[0.72rem] font-extrabold px-2.5 py-1 rounded-full ${d.ok ? 'bg-em-soft text-em-deep' : 'bg-[#FBEDEA] text-[#BE3A2B]'}`}>
                    {d.ok ? t('v_ok') : t('v_bad')}
                  </span>
                  {d.type === 'Deed' && (
                    <Link
                      to={`/verify?deed=${encodeURIComponent(d.ref)}&hash=${encodeURIComponent(registryHashOf(d))}`}
                      className="text-[0.78rem] font-bold text-em ml-1.5 whitespace-nowrap hover:underline"
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
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5">
        <h2 className="text-xl font-bold">{t('d_flags')}</h2>
        <ul className="grid gap-2.5 mt-3">
          {(signals.length > 0 ? signals.map((s) => t(s.ck)) : [t('c_none')]).map((c, i) => (
            <li key={i} className="bg-gold-soft border border-[#EBDCAC] rounded-[10px] px-4 py-3 text-[0.9rem] flex gap-2.5">
              <span className="font-extrabold text-[#9A6B14] flex-none">☐</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div
          className="bg-[#FFF8E6] border border-dashed border-gold rounded-xl px-4 py-4 text-[0.85rem] text-[#6B5A1E] mt-4"
          dangerouslySetInnerHTML={{ __html: t('disc') }}
        />
      </div>
    </div>
  );
}
