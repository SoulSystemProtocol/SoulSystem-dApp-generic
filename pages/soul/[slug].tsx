import { useContext } from 'react';
import Layout from 'components/layout/Layout';
import SoulDetail from 'components/entity/soul/SoulDetail';
import { useRouter } from 'next/router';
import { nameSoul } from 'utils/converters';
import { getPageTitle } from 'utils';
import { GAME_DESC } from 'constants/contracts';
import { Box, Grid, Typography } from '@mui/material';
import DisplayPOAP from 'components/web3/DisplayPOAP';
import SoulAffiliations from 'components/entity/soul/SoulAffiliations';
import {
  SelectedSoulContext,
  SelectedSoulProvider,
} from 'contexts/SelectedSoul';
import { SelectedGameProvider } from 'contexts/SelectedGame';
import { SelectedProcProvider } from 'contexts/SelectedProc';
import GameView from 'components/entity/game/GameView';
import TaskView from 'components/entity/task/TaskView';
import { MetadataAttribute } from 'helpers/metadata';
import AttributeDisplayPercentage from 'components/entity/soul/AttributeDisplayPercentage';

/**
 * Component: Single Soul Page
 */
export default function SoulSinglePage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <SelectedSoulProvider slug={slug}>
      <SoulSinglePageContent />
    </SelectedSoulProvider>
  );
}

/**
 * Component: Single Soul Page Content
 */
function SoulSinglePageContent(): JSX.Element {
  const { soul, loading, error } = useContext(SelectedSoulContext);

  const CONF = {
    PAGE_TITLE: nameSoul(soul),
    TITLE: nameSoul(soul),
    SUBTITLE: GAME_DESC.dao,
  };

  const sidewaySX = {
    writingMode: 'vertical-lr',
    letterSpacing: '0.15em',
    fontSize: '0.8em',
    margin: 'auto 0',
    transform: 'rotate(180deg)',
    marginLeft: '-18px',
  };

  if (error) return <>Failed to Load Entity</>;

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      {soul?.type == '' && <SoulDetail soul={soul} />}
      {soul?.type == 'GAME' && (
        <SelectedGameProvider hash={soul?.owner}>
          <GameView />
        </SelectedGameProvider>
      )}
      {soul?.type == 'TASK' && (
        <SelectedProcProvider address={soul?.owner}>
          <TaskView />
        </SelectedProcProvider>
      )}
      {soul?.type == '' && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {/* <Grid key={'header'} item xs={12}>
            <Typography variant="h4">Skills</Typography>
          </Grid> */}
          {soul?.metadata?.attributes.map(
            (item: MetadataAttribute, index: number) =>
              item && item.display_type != 'boost_percentage' ? null : (
                <Grid key={item.trait_type} item xs={4} sm={2} lg={2}>
                  <AttributeDisplayPercentage item={item} />
                </Grid>
              ),
          )}
        </Grid>
      )}

      {soul?.type == '' && (
        <Box sx={{ my: 2, display: 'flex' }}>
          {soul?.owner && (
            <DisplayPOAP
              account={soul.owner}
              title={
                <Typography variant="h4" sx={sidewaySX}>
                  POAP
                </Typography>
              }
            />
          )}
        </Box>
      )}
      {soul?.type == '' && <SoulAffiliations />}
    </Layout>
  );
}
