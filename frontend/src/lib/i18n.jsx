import { createContext, useContext, useEffect, useState } from 'react';
import { STRINGS } from './strings.js';

// Extra keys needed by the Phase-2 app that have no Phase-1 equivalent.
const EXTRA = {
  en: {
    offline_note: 'Offline demo data — API unreachable',
    m_h: 'How LandVault scores risk',
    m_p: 'Every score is deterministic: the same records always produce the same score. There is no black box — each point of risk maps to a visible record below.',
    m_signals_h: 'The six fraud signals',
    m_tiers_h: 'Risk tiers',
    m_honesty_h: 'Honest by design',
    plot_not_found: 'Plot not found in the registry.',
    loading: 'Loading…',
    d_signals_n: '{n} signals',
  },
  bn: {
    offline_note: 'অফলাইন ডেমো ডেটা — API-তে সংযোগ হয়নি',
    m_h: 'ল্যান্ডভল্ট কীভাবে ঝুঁকি নির্ধারণ করে',
    m_p: 'প্রতিটি স্কোর নির্ণায়ক: একই রেকর্ড সবসময় একই স্কোর দেয়। কোনো ব্ল্যাক বক্স নেই — প্রতিটি ঝুঁকির পয়েন্ট নিচে দৃশ্যমান রেকর্ডের সাথে যুক্ত।',
    m_signals_h: 'ছয়টি জালিয়াতির সংকেত',
    m_tiers_h: 'ঝুঁকির স্তর',
    m_honesty_h: 'সততার সাথে ডিজাইন',
    plot_not_found: 'রেজিস্ট্রিতে প্লট পাওয়া যায়নি।',
    loading: 'লোড হচ্ছে…',
    d_signals_n: '{n}টি সংকেত',
  },
};
Object.assign(STRINGS.en, EXTRA.en);
Object.assign(STRINGS.bn, EXTRA.bn);

const LangCtx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lv-lang') || 'en'; } catch { return 'en'; }
  });
  useEffect(() => {
    try { localStorage.setItem('lv-lang', lang); } catch {}
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  }, [lang]);
  const t = (k, vars) => {
    let s = (STRINGS[lang] && STRINGS[lang][k]) || STRINGS.en[k] || k;
    if (vars) for (const [kk, vv] of Object.entries(vars)) s = String(s).replace('{' + kk + '}', vv);
    return s;
  };
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
