import Layout from 'components/layout/Layout';
import SoulDetail from 'components/soul/SoulDetail';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { hexStringToJson, soulToFirstLastNameString } from 'utils/converters';
import SoulGames from 'components/soul/SoulGames';
import SoulProcs from 'components/soul/SoulProcs';
import GameView from 'components/game/GameView';
import { getPageTitle } from 'utils';
import { GAME_DESC, GAME_NAME, GAME_TYPE } from 'constants/contracts';
import { gamePartCardContent, taskPartCardContent } from 'utils/cardContents';
import { Box, Typography } from '@mui/material';
import querySoulSingle from 'queries/SoulSingleQuery';
import { useQuery } from '@apollo/client';
import DisplayPOAP from 'components/web3/DisplayPOAP';

function normalizeGraphEntity(subgraphEntity: any) {
  return {
    ...subgraphEntity,
    metadata: hexStringToJson(subgraphEntity.uriData),
  };
}

/**
 * Component: Single Soul Page
 */
export default function SoulDetailPage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getSoulById } = useSoul();
  const [soul, setSoul] = useState<any | null>(null);

  console.log('Soul', soul);
  const CONF = {
    PAGE_TITLE: soulToFirstLastNameString(soul),
    TITLE: soulToFirstLastNameString(soul),
    SUBTITLE: GAME_DESC.dao,
  };

  const { data, loading, error } = useQuery(querySoulSingle, {
    variables: { id: slug },
  });

  useEffect(() => {
    if (error) console.error('Soul query failed', { data, error });
    else console.log('[DEV] Soul query Return:', data);
    setSoul(data?.soul ? normalizeGraphEntity(data.soul) : null);
  }, [data, error]);

  async function loadData() {
    try {
      setSoul(await getSoulById(slug as string));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  // useEffect(() => {
  //   if (slug) {
  //     loadData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [slug]);

  const soulMemberMDAOs = {
    variables: {
      id: soul?.id,
      entRole: GAME_TYPE.mdao,
    },
    getCardContent: gamePartCardContent,
  };

  const soulMemberProjects = {
    variables: {
      id: soul?.id,
      entRole: GAME_TYPE.project,
    },
    getCardContent: gamePartCardContent,
  };

  const soulMemberTasks = {
    variables: {
      id: soul?.id,
      entRole: 'BOUNTY',
    },
    getCardContent: taskPartCardContent,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      {soul?.type == '' && <SoulDetail soul={soul} />}
      {soul?.type == 'GAME' && <GameView id={soul.owner} sx={{ mt: 4 }} />}

      <Box sx={{ my: 2 }}>
        <Typography variant="h3">POAPs</Typography>
        {soul?.owner && <DisplayPOAP account={soul.owner} />}
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {GAME_NAME.mdao}
        </Typography>
        {soul?.id && <SoulGames {...soulMemberMDAOs} />}
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {GAME_NAME.project}
        </Typography>
        {soul?.id && <SoulGames {...soulMemberProjects} />}
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h3">{GAME_NAME.tasks}</Typography>
        {soul?.id && <SoulProcs {...soulMemberTasks} />}
      </Box>
    </Layout>
  );
}
