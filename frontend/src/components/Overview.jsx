import { useLang } from '../lib/i18n.jsx';
import TierBadge, { TIER_COLORS } from './TierBadge.jsx';

const TIERS = ['low', 'med', 'high', 'crit'];

export default function Overview({ stats, tier, onTier }) {
  const { t } = useLang();
  if (!stats) {
    return (
      <section className="my-8">
        <div className="bg-white border border-line rounded-2xl p-6">
          <div className="skeleton h-6 w-48 mb-3" />
          <div className="skeleton h-4 w-full mb-4" />
          <div className="skeleton h-10 w-full" />
        </div>
      </section>
    );
  }
  return (
    <section className="my-8">
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6">
        <h2 className="text-xl font-bold">{t('ov_h')}</h2>
        <p className="text-muted text-sm mt-1 mb-4">
          {t('ov_p')} · <b className="tnum">{stats.total}</b> {t('ov_total')}
        </p>
        <div className="flex h-4 rounded-full overflow-hidden bg-[#EDF1EC]">
          {TIERS.map(
            (k) =>
              stats.tiers[k] > 0 && (
                <span
                  key={k}
                  title={`${k}: ${stats.tiers[k]}`}
                  className="block h-full"
                  style={{ width: ((stats.tiers[k] / stats.total) * 100).toFixed(1) + '%', background: TIER_COLORS[k] }}
                />
              )
          )}
        </div>
        <div className="flex gap-3 flex-wrap mt-4">
          {TIERS.map((k) => (
            <button
              key={k}
              onClick={() => onTier(k)}
              className={`inline-flex items-center gap-2 text-sm px-3.5 py-2 border rounded-full bg-white transition ${
                tier === k
                  ? 'border-em bg-em-soft shadow-[0_8px_28px_rgba(20,45,32,0.08)]'
                  : 'border-line hover:border-em hover:-translate-y-px'
              }`}
            >
              <TierBadge tier={k}>{t('ov_' + k)}</TierBadge>
              <b className="tnum">{stats.tiers[k]}</b>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
