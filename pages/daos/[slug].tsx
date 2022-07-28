import Dao from 'classes/Dao';
import DaoDetail from 'components/dao/DaoDetail';
import DaoTabs from 'components/dao/DaoTabs';
import Layout from 'components/layout/Layout';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line prettier/prettier
interface DaoProps { }

/**
 * Page with DAO details.
 */
// eslint-disable-next-line prettier/prettier
export default function DaoDetailPage({ }: DaoProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getDaoById } = useDao();
  const [dao, setDao] = useState<Dao | null>(null);

  async function loadData() {
    try {
      setDao(await getDaoById(slug as string));
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
  if (dao) title += ' | ' + dao.name;
  return (
    <Layout title={title}>
      <DaoDetail dao={dao} />
      <DaoTabs dao={dao} sx={{ mt: 4 }} />
    </Layout>
  );
}
