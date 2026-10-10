const CLS = {
  low: 'bg-em-soft text-em-deep',
  med: 'bg-[#FBF3DF] text-[#9A6B14]',
  high: 'bg-[#FDEBD8] text-[#A34A00]',
  crit: 'bg-[#FBEDEA] text-[#BE3A2B]',
};

export const TIER_COLORS = { low: '#2FA36B', med: '#E0A020', high: '#E06A1B', crit: '#E0483A' };

export default function TierBadge({ tier, children, className = '' }) {
  return (
    <span
      className={`text-[0.72rem] font-extrabold tracking-[1px] px-3 py-1 rounded-full uppercase whitespace-nowrap ${CLS[tier] || CLS.low} ${className}`}
    >
      {children}
    </span>
  );
}
