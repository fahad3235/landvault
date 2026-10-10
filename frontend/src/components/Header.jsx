import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import { useMode } from '../lib/api.js';
import { gt } from './govtext.js';

// Official-style circular emblem: green ring, gold star, shield check.
export function Emblem({ size = 52 }) {
  return (
    <span className="flex-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="28" r="26" stroke="#006A4E" strokeWidth="3" />
        <circle cx="28" cy="28" r="21.5" stroke="#B7791F" strokeWidth="1.4" />
        <path
          d="M28 13l3.1 6.3 6.9 1-5 4.9 1.2 6.8L28 28.7l-6.2 3.3 1.2-6.8-5-4.9 6.9-1L28 13z"
          fill="#B7791F"
        />
        <path d="M23.5 36.5l3 3 6-6" stroke="#006A4E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLang();
  const mode = useMode();
  const g = (k) => gt(lang, k);
  const linkCls = ({ isActive }) =>
    `px-3 py-2 text-[0.95rem] font-semibold transition border-b-2 ${
      isActive ? 'text-gov-deep border-gov' : 'text-ink border-transparent hover:text-gov-deep'
    }`;
  const deadCls = 'px-3 py-2 text-[0.95rem] font-semibold text-muted cursor-default select-none';
  return (
    <header className="sticky top-0 z-50 bg-white shadow-gov">
      {/* slim tricolor utility strip */}
      <div className="flex h-[6px]" aria-hidden="true">
        <div className="flex-[2] bg-gov" />
        <div className="flex-[1] bg-white border-y border-line" />
        <div className="flex-[2] bg-accent" />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-3 py-2.5">
        <Link to="/" className="flex items-center gap-3">
          <Emblem />
          <span>
            <b className="text-[1.6rem] leading-none block text-ink tracking-tight">LandVault</b>
            <small className="text-[0.95rem] text-ink font-semibold block leading-tight">{t('tagline')}</small>
          </span>
        </Link>
        <nav className="hidden lg:flex gap-0.5 ml-6 items-center">
          <NavLink to="/" end className={linkCls}>{t('nav_home')}</NavLink>
          <NavLink to="/" className={() => linkCls({ isActive: false })}>{g('nav_search')}</NavLink>
          <NavLink to="/verify" className={linkCls}>{t('nav_verify')}</NavLink>
          <span className={deadCls} title={g('nav_services')}>{g('nav_services')}</span>
          <NavLink to="/methodology" className={linkCls}>{g('nav_help')}</NavLink>
          <span className={deadCls} title={g('nav_contact')}>{g('nav_contact')}</span>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {mode === 'offline' && (
            <span
              title={t('offline_note')}
              className="hidden md:inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-[#93370D] bg-[#FEF6E7] border border-[#F5D9A8] px-2.5 py-1.5 rounded-full whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F] inline-block" />
              {t('offline_note')}
            </span>
          )}
          <span className="hidden sm:inline-block bg-ink text-white text-[0.68rem] font-extrabold tracking-[1.2px] px-3 py-1.5 rounded-full uppercase whitespace-nowrap">
            {t('demobadge')}
          </span>
          <div className="flex border border-line rounded-lg overflow-hidden flex-none bg-white">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-[0.8rem] font-bold transition ${lang === 'en' ? 'bg-gov text-white' : 'text-muted hover:bg-panel'}`}
            >
              EN
            </button>
            <span className="w-px bg-line" />
            <button
              onClick={() => setLang('bn')}
              className={`px-3 py-1.5 text-[0.8rem] font-bold transition ${lang === 'bn' ? 'bg-gov text-white' : 'text-muted hover:bg-panel'}`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
