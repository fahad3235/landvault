import { useLang } from '../lib/i18n.jsx';
import { gt } from './govtext.js';

// Sidebar card: official notice board with synthetic-data notice + helpline.
export default function NoticeBoard() {
  const { lang } = useLang();
  const g = (k) => gt(lang, k);
  return (
    <div className="bg-white border border-line rounded-lg shadow-gov p-5">
      <h3 className="text-[1.05rem] font-bold text-ink flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.8">
          <path d="M10 2.5a5.5 5.5 0 0 0-5.5 5.5c0 4-1.5 5.5-1.5 5.5h14S15.5 12 15.5 8A5.5 5.5 0 0 0 10 2.5z" strokeLinejoin="round" />
          <path d="M8 16.5a2 2 0 0 0 4 0" strokeLinecap="round" />
        </svg>
        {g('notice_h')}
      </h3>
      <div className="border-l-4 border-accent bg-panel rounded-r-md px-4 py-3.5 mt-3.5">
        <b className="text-[0.92rem] text-ink block">{g('notice_t')}</b>
        <p className="text-[0.85rem] text-muted mt-1.5">{g('notice_p')}</p>
        <p className="text-[0.85rem] text-ink font-semibold mt-2.5">{g('notice_helpline')}</p>
      </div>
    </div>
  );
}
