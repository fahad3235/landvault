// Gov-portal risk pills: LOW green, MEDIUM amber, HIGH orange, CRITICAL red.
const CLS = {
  low: 'bg-[#E7F6EC] text-[#067647] border border-[#A9DFC0]',
  med: 'bg-[#FEF6E7] text-[#93370D] border border-[#F5D9A8]',
  high: 'bg-[#FFF1E8] text-[#C24E00] border border-[#F8C79B]',
  crit: 'bg-[#FDECEC] text-[#D92D20] border border-[#F5B8B8]',
};

export const TIER_COLORS = { low: '#16A34A', med: '#B7791F', high: '#EA580C', crit: '#F42A41' };

export default function TierBadge({ tier, children, className = '' }) {
  return (
    <span
      className={`text-[0.72rem] font-extrabold tracking-[0.8px] px-3 py-1 rounded-full uppercase whitespace-nowrap ${CLS[tier] || CLS.low} ${className}`}
    >
      {children}
    </span>
  );
}
