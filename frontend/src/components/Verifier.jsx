import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { verifyDeed, getRegistryHash, tamperHash } from '../lib/api.js';

/**
 * Deed authenticity checker. Reused on Home (card) and /verify (page).
 */
export default function Verifier({ initialDeed = '', initialHash = '' }) {
  const { t } = useLang();
  const [deed, setDeed] = useState(initialDeed);
  const [hash, setHash] = useState(initialHash);
  const [verdict, setVerdict] = useState(null); // {found, match, deedNo, registryHash, plotId}

  useEffect(() => {
    setDeed(initialDeed);
    setHash(initialHash);
    setVerdict(null);
  }, [initialDeed, initialHash]);

  const check = async (d = deed, h = hash) => {
    setVerdict(await verifyDeed(d, h));
  };

  const tamper = async () => {
    const d = (deed || 'DL-2024-11802').trim();
    setDeed(d);
    const rh = await getRegistryHash(d);
    if (!rh) {
      setVerdict({ found: false, match: false, deedNo: d, registryHash: '', plotId: '' });
      return;
    }
    const th = tamperHash(rh);
    setHash(th);
    setVerdict(await verifyDeed(d, th));
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-[0.82rem] font-bold text-muted block mb-1.5">{t('ver_deed')}</label>
          <input
            value={deed}
            onChange={(e) => setDeed(e.target.value)}
            placeholder="DL-2024-11802"
            className="w-full px-3.5 py-3 border border-line rounded-[10px] text-[0.95rem] outline-none focus:border-em"
          />
        </div>
        <div>
          <label className="text-[0.82rem] font-bold text-muted block mb-1.5">{t('ver_hash')}</label>
          <input
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="9f2c…"
            className="w-full px-3.5 py-3 border border-line rounded-[10px] text-[0.95rem] outline-none focus:border-em font-mono"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2.5 flex-wrap">
        <button
          onClick={() => check()}
          className="bg-em text-white font-extrabold px-6 py-3 rounded-[10px] text-[0.95rem] hover:bg-em-deep transition"
        >
          {t('ver_btn')}
        </button>
        <button
          onClick={tamper}
          className="bg-white text-em-deep font-extrabold px-6 py-3 rounded-[10px] text-[0.95rem] border border-line hover:border-em transition"
        >
          {t('ver_tamper')}
        </button>
      </div>

      {verdict && (
        <div
          className={`mt-4 rounded-xl p-[18px] text-[0.95rem] border ${
            verdict.found && verdict.match
              ? 'bg-em-soft border-[#BFE0CC]'
              : 'bg-[#FBEDEA] border-[#F0C4BC]'
          }`}
        >
          {!verdict.found ? (
            <b>{t('ver_nf')}</b>
          ) : verdict.match ? (
            <>
              <b>{t('ver_ok_t')}</b>
              <p className="mt-1.5">
                {t('ver_ok_p')}
                <br />
                <span className="text-[0.83rem] text-muted">
                  {t('col_deed')}: {verdict.deedNo} · {t('col_hash')}:{' '}
                  <span className="font-mono text-[0.78rem] bg-[#F1F5F0] px-2 py-0.5 rounded-md">{verdict.registryHash}</span>
                </span>
              </p>
            </>
          ) : (
            <>
              <b>{t('ver_no_t')}</b>
              <p className="mt-1.5">
                {t('ver_no_p')}
                <br />
                <span className="text-[0.83rem] text-muted">
                  {t('col_deed')}: {verdict.deedNo}
                  <br />
                  {t('ver_hash')} ({t('col_hash')}):{' '}
                  <span className="font-mono text-[0.78rem] bg-[#F1F5F0] px-2 py-0.5 rounded-md">{verdict.registryHash}</span>
                </span>
              </p>
            </>
          )}
        </div>
      )}
      <p
        className="text-[0.82rem] text-muted mt-4"
        dangerouslySetInnerHTML={{ __html: t('ver_note') }}
      />
    </div>
  );
}
