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
const SEV_BAR = { bad: '#F42A41', warn: '#B7791F' };

const card = 'bg-white border border-line rounded-lg shadow-gov p-5 md:p-6 mb-5';
const h2 = 'text-[1.2rem] font-bold text-ink';

export default function Methodology() {
  const { t } = useLang();
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className={card}>
        <h2 className="text-[1.3rem] font-bold text-ink">{t('m_h')}</h2>
        <p className="text-muted text-[0.93rem] mt-1">{t('m_p')}</p>
      </div>

      <div className={card}>
        <h2 className={h2}>{t('m_signals_h')}</h2>
        <ol className="grid gap-3 sm:grid-cols-2 mt-3.5 list-none">
          {SIGNAL_ORDER.map((key, i) => {
            const meta = SIGNAL_META[key];
            return (
              <li
                key={key}
                className="border border-line rounded-md px-4 py-3.5 bg-white flex gap-3"
                style={{ borderLeft: `4px solid ${SEV_BAR[meta.cls]}` }}
              >
                <span className="w-7 h-7 rounded-full bg-gov text-white font-extrabold flex-none flex items-center justify-center text-[0.85rem]">
                  {i + 1}
                </span>
                <div>
                  <span className="float-right font-extrabold text-[0.95rem] tnum text-ink ml-2">+{W[key]}</span>
                  <h4 className="text-[0.95rem] font-bold mb-1 text-ink">{t(meta.tk)}</h4>
                  <p className="text-[0.83rem] text-muted">{t(meta.pk)}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="text-[0.83rem] text-muted mt-3">
          Score = min(100, Σ weights)
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>{t('m_tiers_h')}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-3.5">
          {BANDS.map((b) => (
            <div key={b.tier} className="border border-line rounded-lg p-4 bg-white">
              <TierBadge tier={b.tier}>{t('ov_' + b.tier)}</TierBadge>
              <div className="text-2xl font-extrabold tnum mt-2" style={{ color: TIER_COLORS[b.tier] }}>
                {b.range}
              </div>
              <p className="text-[0.83rem] text-muted mt-1">{t(b.desc)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <h2 className={h2}>{t('m_honesty_h')}</h2>
        <div
          className="bg-panel border border-dashed border-line rounded-lg px-4 py-3.5 text-[0.84rem] text-muted mt-3"
          dangerouslySetInnerHTML={{ __html: t('disc') }}
        />
      </div>
    </div>
  );
}
