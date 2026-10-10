import { TIER_COLORS } from './TierBadge.jsx';

export default function RiskDial({ score, tier }) {
  const C = 2 * Math.PI * 54;
  const off = C * (1 - score / 100);
  const col = TIER_COLORS[tier] || TIER_COLORS.low;
  return (
    <div className="relative w-[130px] h-[130px] flex-none">
      <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
        <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="12" />
        <circle
          cx="65" cy="65" r="54" fill="none" stroke={col} strokeWidth="12"
          strokeLinecap="round" strokeDasharray={C.toFixed(1)} strokeDashoffset={off.toFixed(1)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <b className="text-3xl tnum leading-none">{score}</b>
        <span className="text-[0.68rem] tracking-[1px] text-[#CFE3D6] uppercase mt-1">/ 100</span>
      </div>
    </div>
  );
}
