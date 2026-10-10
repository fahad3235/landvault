import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { verifyDeed, getRegistryHash, tamperHash } from '../lib/api.js';

/**
 * Deed authenticity checker — official form aesthetic. Reused on Home (card) and /verify (page).
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

  const labelCls = 'text-[0.82rem] font-bold text-ink block mb-1.5';
  const inputCls =
    'w-full px-3.5 py-3 border border-line rounded-md text-[0.95rem] text-ink outline-none focus:border-gov focus:ring-2 focus:ring-gov-soft bg-white';

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{t('ver_deed')}</label>
          <input
            value={deed}
            onChange={(e) => setDeed(e.target.value)}
            placeholder="DL-2024-11802"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{t('ver_hash')}</label>
          <input
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="9f2c…"
            className={`${inputCls} font-mono`}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2.5 flex-wrap">
        <button
          onClick={() => check()}
          className="bg-gov hover:bg-gov-deep text-white font-bold px-6 py-3 rounded-md text-[0.95rem] transition"
        >
          {t('ver_btn')}
        </button>
        <button
          onClick={tamper}
          className="bg-white text-gov-deep font-bold px-6 py-3 rounded-md text-[0.95rem] border border-line hover:border-gov transition"
        >
          {t('ver_tamper')}
        </button>
      </div>

      {verdict && (
        <div
          className={`mt-4 rounded-md p-[18px] text-[0.95rem] border-l-4 ${
            verdict.found && verdict.match
              ? 'bg-[#E7F6EC] border-l-[#16A34A] border border-[#A9DFC0]'
              : 'bg-[#FDECEC] border-l-accent border border-[#F5B8B8]'
          }`}
        >
          {!verdict.found ? (
            <b className="text-ink">{t('ver_nf')}</b>
          ) : verdict.match ? (
            <>
              <b className="text-[#067647]">{t('ver_ok_t')}</b>
              <p className="mt-1.5 text-ink">
                {t('ver_ok_p')}
                <br />
                <span className="text-[0.83rem] text-muted">
                  {t('col_deed')}: {verdict.deedNo} · {t('col_hash')}:{' '}
                  <span className="font-mono text-[0.78rem] bg-white border border-line px-2 py-0.5 rounded">{verdict.registryHash}</span>
                </span>
              </p>
            </>
          ) : (
            <>
              <b className="text-[#D92D20]">{t('ver_no_t')}</b>
              <p className="mt-1.5 text-ink">
                {t('ver_no_p')}
                <br />
                <span className="text-[0.83rem] text-muted">
                  {t('col_deed')}: {verdict.deedNo}
                  <br />
                  {t('ver_hash')} ({t('col_hash')}):{' '}
                  <span className="font-mono text-[0.78rem] bg-white border border-line px-2 py-0.5 rounded">{verdict.registryHash}</span>
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
