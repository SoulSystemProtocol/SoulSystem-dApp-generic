import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import Layout from 'components/layout/Layout';
import RuleAddDialog from 'components/rules/RuleAddDialog';
import RuleTable from 'components/rules/RuleTable';
import useError from 'hooks/useError';
import useDao from 'hooks/useDao';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Dao from 'classes/Dao';
import ActionsDisplay from 'components/rules/ActionsDisplay';

/**
 * Component: Rule Managment
 */
export default function RuleManage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { getDaoById } = useDao();
  const [game, setGame] = useState<Dao | null>(null);

  async function loadData() {
    try {
      console.log('Loading Game: ', slug);
      setGame(await getDaoById(slug as string));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (slug) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Layout title={'Rule Managment'} maxWidth="xl">
      {game && (
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 6 }}>
            <NextLink href={`/dao/${slug}`} passHref>
              <Link underline="none" color="inherit">
                {game.name || 'DAO'}
              </Link>
            </NextLink>
            <Typography color="text.primary">{'Rule Managment'}</Typography>
          </Breadcrumbs>
          {/* Rules */}
          <Box sx={{ mb: 12 }}>
            <Typography variant="h2" gutterBottom>
              {'Rules'}
            </Typography>
            <Typography gutterBottom>
              {'Each rule consists of a general action and a reaction/judgment'}
            </Typography>
            <Divider />
            <Button
              variant="outlined"
              onClick={() =>
                showDialog?.(
                  <RuleAddDialog jurisdiction={game} onClose={closeDialog} />,
                )
              }
              sx={{ mt: 2.5 }}
            >
              {'Add Rule'}
            </Button>
            <RuleTable jurisdiction={game} sx={{ mt: 2.5 }} />
          </Box>
          {/* Actions */}
          <ActionsDisplay />
        </Box>
      )}
    </Layout>
  );
}
