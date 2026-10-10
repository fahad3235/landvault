import { useLang } from '../lib/i18n.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-11 mb-8 border-t border-line pt-6 text-muted text-[0.83rem]">
      <div className="max-w-[1120px] mx-auto px-5 flex gap-4 flex-wrap justify-between">
        <div>
          <b className="text-ink">LandVault</b> · <span dangerouslySetInnerHTML={{ __html: t('ft') }} />
        </div>
        <div>{t('ft2')}</div>
      </div>
      <div className="max-w-[1120px] mx-auto px-5">
        <div
          className="bg-[#FFF8E6] border border-dashed border-gold rounded-xl px-4 py-4 text-[0.85rem] text-[#6B5A1E] mt-4"
          dangerouslySetInnerHTML={{ __html: t('disc') }}
        />
      </div>
    </footer>
  );
}
