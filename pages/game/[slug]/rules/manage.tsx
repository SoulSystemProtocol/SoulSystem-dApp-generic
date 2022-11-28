import { Box, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import Layout from 'components/layout/Layout';
import RuleAddDialog from 'components/rules/RuleAddDialog';
import RuleTable from 'components/rules/RuleTable';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import ActionsDisplay from 'components/rules/ActionsDisplay';
import useGameByHash from 'hooks/useGameByHash';
import Loading from 'components/layout/Loading';
import Link from 'components/utils/Link';

/**
 * Component: Rule Managment
 */
export default function RuleManage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { game, loading, error } = useGameByHash(slug as string);

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
              {game.name || 'DAO'}
            </Link>
            <Typography color="text.primary">{'Rule Managment'}</Typography>
          </Breadcrumbs>
          {/* Rules */}
          <Box sx={{ mb: 12 }}>
            <Typography variant="h2" gutterBottom>
              Rules
            </Typography>
            <Typography gutterBottom>
              Each rule consists of a general action and a reaction/judgment
            </Typography>
            <Divider />
            <Button
              variant="outlined"
              onClick={() =>
                showDialog?.(
                  <RuleAddDialog item={game} onClose={closeDialog} />,
                )
              }
              sx={{ mt: 2.5 }}
            >
              Add Rule
            </Button>
            <RuleTable item={game} sx={{ mt: 2.5 }} />
          </Box>
          {/* Actions */}
          <ActionsDisplay />
        </Box>
      )}
    </Layout>
  );
}
