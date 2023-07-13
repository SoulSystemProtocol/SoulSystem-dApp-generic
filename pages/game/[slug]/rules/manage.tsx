import { Box, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import Layout from 'components/layout/Layout';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import useGameByHash from 'hooks/useGameByHash';
import Loading from 'components/layout/Loading';
import Link from 'components/utils/Link';
import useSoulByHash from 'hooks/useSoulByOwner';
import RuleManage from 'components/rules/RuleManage';

/**
 * Component: Rule Managment
 */
export default function RuleManagePage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { game, loading, error } = useGameByHash(slug as string);
  const { soul } = useSoulByHash(game?.id as string);

  if (error) {
    handleError(error, false);
    return <>Failed to load Entity</>;
  }
  if (loading) return <Loading />;
  return (
    <Layout title={'Rule Managment'} maxWidth="xl">
      {game && (
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 6 }}>
            <Link href={`/soul/${slug}`} sx={{ color: 'inherit' }}>
              {soul?.name || 'DAO'}
            </Link>
            <Typography color="text.primary">{'Rule Managment'}</Typography>
          </Breadcrumbs>
          {/* Rules */}
          <RuleManage ctx={game} />
        </Box>
      )}
    </Layout>
  );
}
