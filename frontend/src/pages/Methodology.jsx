import { useLang } from '../lib/i18n.jsx';
import { W, SIGNAL_META } from '../lib/registry.js';
import TierBadge, { TIER_COLORS } from '../components/TierBadge.jsx';

const SIGNAL_ORDER = ['double', 'hash', 'brk', 'regmut', 'flip', 'kase', 'khas', 'acq'];
const BANDS = [
  { tier: 'low', range: '0–29', desc: 'd_low' },
  { tier: 'med', range: '30–59', desc: 'd_med' },
  { tier: 'high', range: '60–89', desc: 'd_high' },
  { tier: 'crit', range: '90–100', desc: 'd_crit' },
];
const SEV_BAR = { bad: '#E0483A', warn: '#E0A020' };

export default function Methodology() {
  const { t } = useLang();
  return (
    <div className="max-w-[1120px] mx-auto px-5 py-8">
      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5">
        <h2 className="text-xl font-bold">{t('m_h')}</h2>
        <p className="text-muted text-[0.93rem] mt-1">{t('m_p')}</p>
      </div>

      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5">
        <h2 className="text-xl font-bold">{t('m_signals_h')}</h2>
        <div className="grid gap-3 sm:grid-cols-2 mt-3.5">
          {SIGNAL_ORDER.map((key) => {
            const meta = SIGNAL_META[key];
            return (
              <div
                key={key}
                className="border border-line rounded-[10px] px-4 py-3.5 bg-white"
                style={{ borderLeft: `5px solid ${SEV_BAR[meta.cls]}` }}
              >
                <span className="float-right font-extrabold text-[0.95rem] tnum text-ink">+{W[key]}</span>
                <h4 className="text-[0.95rem] font-bold mb-1 pr-12">{t(meta.tk)}</h4>
                <p className="text-[0.83rem] text-muted">{t(meta.pk)}</p>
              </div>
            );
          })}
        </div>
        <p className="text-[0.83rem] text-muted mt-3">
          Score = min(100, Σ weights)
        </p>
      </div>

      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6 mb-5">
        <h2 className="text-xl font-bold">{t('m_tiers_h')}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-3.5">
          {BANDS.map((b) => (
            <div key={b.tier} className="border border-line rounded-xl p-4">
              <TierBadge tier={b.tier}>{t('ov_' + b.tier)}</TierBadge>
              <div className="text-2xl font-extrabold tnum mt-2" style={{ color: TIER_COLORS[b.tier] }}>
                {b.range}
              </div>
              <p className="text-[0.83rem] text-muted mt-1">{t(b.desc)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-line rounded-2xl shadow-[0_8px_28px_rgba(20,45,32,0.08)] p-6">
        <h2 className="text-xl font-bold">{t('m_honesty_h')}</h2>
        <div
          className="bg-[#FFF8E6] border border-dashed border-gold rounded-xl px-4 py-4 text-[0.85rem] text-[#6B5A1E] mt-3"
          dangerouslySetInnerHTML={{ __html: t('disc') }}
        />
      </div>
    </div>
  );
}
