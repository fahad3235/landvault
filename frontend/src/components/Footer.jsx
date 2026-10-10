import { useLang } from '../lib/i18n.jsx';
import { gt } from './govtext.js';

export default function Footer() {
  const { lang, t } = useLang();
  const g = (k) => gt(lang, k);
  return (
    <footer className="mt-12 border-t-4 border-gov bg-panel">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-3 flex-wrap items-center justify-between text-[0.85rem] text-muted">
          <span className="font-semibold text-ink">{g('ft_gov')}</span>
          <span>{g('ft_links')}</span>
          <span className="tnum">{g('ft_ver')}</span>
        </div>
        <div
          className="bg-white border border-dashed border-line rounded-lg px-4 py-3 text-[0.82rem] text-muted mt-4"
          dangerouslySetInnerHTML={{ __html: t('disc') }}
        />
        <div className="text-[0.78rem] text-muted mt-3">{t('ft2')}</div>
      </div>
    </footer>
  );
}
