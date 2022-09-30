import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import { DialogContext, IDialogContext } from 'contexts/dialog';
import Layout from 'components/layout/Layout';
import ActionAddDialog from 'components/rules/ActionAddDialog';
import ActionTable from 'components/rules/ActionTable';
import RuleAddDialog from 'components/rules/RuleAddDialog';
import RuleTable from 'components/rules/RuleTable';
import useError from 'hooks/useError';
import useDao from 'hooks/useDao';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Dao from 'classes/Dao';

/**
 * Component: Rule Manager
 */
export default function LawManager(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;

  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();

  const { getDaoById } = useDao();
  const [game, setGame] = useState<Dao | null>(null);

  async function loadData() {
    try {
      setGame(await getDaoById(slug as string));
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
    <Layout title={'Law Manager'} maxWidth="xl">
      {game && (
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 6 }}>
            <NextLink href={`/dao/${slug}`} passHref>
              <Link underline="none" color="inherit">
                {game.name || 'DAO'}
              </Link>
            </NextLink>
            <Typography color="text.primary">{'Rule Manager'}</Typography>
          </Breadcrumbs>
          {/* Rules */}
          <Box>
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
          <Box sx={{ mt: 12 }}>
            <Typography variant="h2" gutterBottom>
              Actions
            </Typography>
            <Typography gutterBottom>
              {`General actions that a game admin can use to create the game's rules`}
            </Typography>
            <Divider />
            <Button
              variant="outlined"
              onClick={() =>
                showDialog?.(<ActionAddDialog onClose={closeDialog} />)
              }
              sx={{ mt: 2.5 }}
            >
              Add Action
            </Button>
            <ActionTable sx={{ mt: 2.5 }} />
          </Box>
        </Box>
      )}
    </Layout>
  );
}
