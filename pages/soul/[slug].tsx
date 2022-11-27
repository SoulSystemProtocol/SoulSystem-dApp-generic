import { useContext } from 'react';
import Layout from 'components/layout/Layout';
import SoulDetail from 'components/entity/soul/SoulDetail';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { soulToFirstLastNameString } from 'utils/converters';
import { getPageTitle } from 'utils';
import { GAME_DESC } from 'constants/contracts';
import { Box, Typography } from '@mui/material';
import DisplayPOAP from 'components/web3/DisplayPOAP';
import SoulAffiliations from 'components/entity/soul/SoulAffiliations';
import {
  SelectedSoulContext,
  SelectedSoulProvider,
} from 'contexts/SelectedSoul';

import { SelectedGameProvider } from 'contexts/SelectedGame';
import GameView from 'components/entity/game/GameView';

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
    PAGE_TITLE: soulToFirstLastNameString(soul),
    TITLE: soulToFirstLastNameString(soul),
    SUBTITLE: GAME_DESC.dao,
  };

  const sidewaySX = {
    writingMode: 'vertical-lr',
    letterSpacing: '0.15em',
    fontSize: '0.8em',
    margin: 'auto 0',
    transform: 'rotate(180deg)',
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      {soul?.type == '' && <SoulDetail soul={soul} />}
      {soul?.type == 'GAME' && (
        <SelectedGameProvider hash={soul?.owner}>
          <GameView sx={{ mt: 4 }} />
        </SelectedGameProvider>
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
      {/* {soul?.type == '' && <SoulAffiliations soul={soul} />} */}
      <SoulAffiliations soul={soul} />
    </Layout>
  );
}
