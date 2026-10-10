import { Link } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import TierBadge from './TierBadge.jsx';

export default function PlotCard({ plot }) {
  const { t } = useLang();
  return (
    <Link
      to={`/plot/${plot.id}`}
      className="block border border-line rounded-xl p-[18px] bg-white transition hover:border-em hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="text-[0.75rem] font-extrabold text-muted tracking-[1px]">{plot.id}</div>
      <h3 className="text-[1.05rem] font-semibold mt-1">
        {t('d_mouza')}: {plot.mouza} · {t('d_dag')} {plot.dag}
      </h3>
      <div className="text-[0.85rem] text-muted mt-0.5">
        {plot.district}, {plot.upazila} · {t('d_khatian')} {plot.khatian} ·{' '}
        <span className="tnum">{plot.area}</span> {t('d_dec')}
      </div>
      <div className="flex justify-between items-center mt-3 gap-2">
        <span className="text-[0.83rem] text-muted truncate">{plot.owner}</span>
        <TierBadge tier={plot.tier}>{plot.score}</TierBadge>
      </div>
    </Link>
  );
}
