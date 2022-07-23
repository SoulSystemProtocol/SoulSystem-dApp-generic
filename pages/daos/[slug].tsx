import Dao from 'classes/Dao';
import DaoDetail from 'components/dao/DaoDetail';
import GameMembers from 'components/game/GameMembers';
import Layout from 'components/layout/Layout';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface DaoProps {}

/**
 * Page with DAO details.
 */
export default function DaoDetailPage({}: DaoProps) {
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

  return (
    <Layout title="MentorDAO — Mentor DAO">
      <DaoDetail dao={dao} />
      <GameMembers game={dao} sx={{ mt: 4 }} />
    </Layout>
  );
}
