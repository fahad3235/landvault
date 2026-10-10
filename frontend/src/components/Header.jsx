import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import { useMode } from '../lib/api.js';

export function LogoMark({ size = 38 }) {
  return (
    <span
      className="rounded-[10px] flex items-center justify-center flex-none"
      style={{ width: size, height: size, background: 'linear-gradient(135deg,#0E6B4A,#0A4A34)' }}
    >
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="2">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    </span>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLang();
  const mode = useMode();
  const linkCls = ({ isActive }) =>
    `px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
      isActive ? 'bg-em-soft text-em-deep' : 'text-muted hover:bg-em-soft hover:text-em-deep'
    }`;
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
      <div className="max-w-[1120px] mx-auto px-5 flex items-center gap-3 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span>
            <b className="text-[1.15rem] tracking-wide block leading-none">LandVault</b>
            <small className="text-[0.68rem] text-muted font-semibold tracking-[1.4px] uppercase">{t('tagline')}</small>
          </span>
        </Link>
        <nav className="hidden md:flex gap-1 ml-2">
          <NavLink to="/" end className={linkCls}>{t('nav_home')}</NavLink>
          <NavLink to="/verify" className={linkCls}>{t('nav_verify')}</NavLink>
          <NavLink to="/methodology" className={linkCls}>{t('nav_how')}</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="bg-[#3A2E0A] text-[#FFD84D] text-[0.7rem] font-extrabold tracking-[1.2px] px-3 py-1.5 rounded-full uppercase whitespace-nowrap">
            {t('demobadge')}
          </span>
          {mode === 'offline' && (
            <span
              title={t('offline_note')}
              className="hidden sm:inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              {t('offline_note')}
            </span>
          )}
          <div className="flex border border-line rounded-full overflow-hidden flex-none">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-xs font-bold transition ${lang === 'en' ? 'bg-em text-white' : 'bg-white text-muted'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-3 py-1.5 text-xs font-bold transition ${lang === 'bn' ? 'bg-em text-white' : 'bg-white text-muted'}`}
            >
              বাং
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
