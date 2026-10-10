import { useLang } from '../lib/i18n.jsx';
import TierBadge, { TIER_COLORS } from './TierBadge.jsx';
import { gt } from './govtext.js';

const TIERS = ['low', 'med', 'high', 'crit'];
const ROW_ICON = {
  low: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#16A34A" strokeWidth="2">
      <path d="M10 17l-6-6 1.4-1.4L10 14.2l4.6-4.6L16 11l-6 6z" fill="#16A34A" stroke="none" />
      <path d="M4 4h12M4 8h12" strokeLinecap="round" />
    </svg>
  ),
  med: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#B7791F" strokeWidth="2">
      <circle cx="10" cy="10" r="7" /><path d="M10 6.5V10l2.5 2" strokeLinecap="round" />
    </svg>
  ),
  high: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#EA580C" strokeWidth="2">
      <path d="M10 3L2.5 16.5h15L10 3z" strokeLinejoin="round" /><path d="M10 8v3.5" strokeLinecap="round" /><circle cx="10" cy="14" r="0.6" fill="#EA580C" />
    </svg>
  ),
  crit: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#F42A41" strokeWidth="2">
      <circle cx="10" cy="10" r="7" /><path d="M10 6v5" strokeLinecap="round" /><circle cx="10" cy="13.6" r="0.7" fill="#F42A41" stroke="none" />
    </svg>
  ),
};

// Sidebar card: "Registry at a glance" — tier rows are clickable drill-downs.
export default function Overview({ stats, tier, onTier }) {
  const { lang, t } = useLang();
  const g = (k) => gt(lang, k);
  if (!stats) {
    return (
      <div className="bg-white border border-line rounded-lg shadow-gov p-5">
        <div className="skeleton h-6 w-40 mb-3" />
        <div className="skeleton h-10 w-full mb-2" />
        <div className="skeleton h-10 w-full" />
      </div>
    );
  }
  return (
    <div className="bg-white border border-line rounded-lg shadow-gov p-5">
      <h3 className="text-[1.05rem] font-bold text-ink flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="2">
          <path d="M4 16V9M10 16V4M16 16v-6" strokeLinecap="round" />
        </svg>
        {g('glance_h')}
      </h3>
      {/* distribution bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden bg-[#EDF0ED] mt-4" role="img" aria-label={t('ov_p')}>
        {TIERS.map(
          (k) =>
            stats.tiers[k] > 0 && (
              <span
                key={k}
                title={`${t('ov_' + k)}: ${stats.tiers[k]}`}
                className="block h-full"
                style={{ width: ((stats.tiers[k] / stats.total) * 100).toFixed(1) + '%', background: TIER_COLORS[k] }}
              />
            )
        )}
      </div>
      {/* total */}
      <div className="flex items-center justify-between bg-panel rounded-md px-3.5 py-2.5 mt-3">
        <span className="text-[0.9rem] font-semibold text-ink">{g('glance_total')}</span>
        <b className="text-[1.15rem] tnum text-ink">{stats.total.toLocaleString('en-US')}</b>
      </div>
      {/* clickable tier rows */}
      <div className="mt-1.5">
        {TIERS.map((k) => (
          <button
            key={k}
            onClick={() => onTier(k)}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 mt-1.5 rounded-md border text-left transition ${
              tier === k ? 'border-gov bg-gov-soft' : 'border-line bg-white hover:border-gov'
            }`}
          >
            {ROW_ICON[k]}
            <span className="text-[0.9rem] font-semibold text-ink flex-1">{g('glance_' + k)}</span>
            <b className="tnum text-[1.05rem] text-ink">{stats.tiers[k].toLocaleString('en-US')}</b>
          </button>
        ))}
      </div>
      <p className="text-[0.78rem] text-muted mt-3">{g('glance_hint')}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TIERS.map((k) => (
          <TierBadge key={k} tier={k}>{t('ov_' + k)}</TierBadge>
        ))}
      </div>
    </div>
  );
}
