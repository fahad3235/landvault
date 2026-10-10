import { useSearchParams } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';
import Verifier from '../components/Verifier.jsx';

export default function VerifyPage() {
  const { t } = useLang();
  const [params] = useSearchParams();
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="bg-white border border-line rounded-lg shadow-gov p-5 md:p-6">
        <h2 className="text-[1.3rem] font-bold text-ink">{t('ver_h')}</h2>
        <p className="text-muted text-[0.93rem] mb-4">{t('ver_p')}</p>
        <Verifier
          key={params.get('deed') || 'blank'}
          initialDeed={params.get('deed') || ''}
          initialHash={params.get('hash') || ''}
        />
      </div>
    </div>
  );
}
