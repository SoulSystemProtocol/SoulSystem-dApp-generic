/**
 * Page for a soul detail
 */
import Soul from 'classes/Soul';
import Layout from 'components/layout/Layout';
import SoulDetail from 'components/soul/SoulDetail';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { soulToFirstLastNameString } from 'utils/converters';
// eslint-disable-next-line prettier/prettier
interface SoulProps { }

/**
 * Page with soul details.
 */
// eslint-disable-next-line prettier/prettier
export default function SoulDetailPage({ }: SoulProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getSoulById } = useSoul();
  const [soul, setSoul] = useState<Soul | null>(null);

  async function loadData() {
    try {
      setSoul(await getSoulById(slug as string));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (slug) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  let title = process.env.NEXT_PUBLIC_APP_NAME;
  if (soul) title += ' | ' + soulToFirstLastNameString(soul);
  return (
    <Layout title={title}>
      <SoulDetail soul={soul} />
    </Layout>
  );
}
