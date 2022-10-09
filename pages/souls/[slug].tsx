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
import SoulMembership from 'components/soul/SoulMembership';
import { getPageTitle } from 'utils';
import { GAME_DESC, GAME_NAME, GAME_TYPE } from 'constants/contracts';
import { gamePartCardContent } from 'utils/cardContents';
import { Box, Typography } from '@mui/material';

/**
 * Component: Single Soul Page
 */
export default function SoulDetailPage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getSoulById } = useSoul();
  const [soul, setSoul] = useState<any | null>(null);

  const CONF = {
    PAGE_TITLE: soulToFirstLastNameString(soul),
    TITLE: soulToFirstLastNameString(soul),
    SUBTITLE: GAME_DESC.dao,
  };

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

  const soulMemberMDAOs = {
    variables: {
      id: soul?.id,
      entRole: GAME_TYPE.mdao,
    },
    getCardContent: gamePartCardContent,
    // renderActions,
    // subtitle: CONF.SUBTITLE,
    // title: CONF.TITLE,
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
      // entRole: GAME_TYPE.??,
    },
    getCardContent: gamePartCardContent,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <SoulDetail soul={soul} />

      {/* {soul?.role == GAME_TYPE.mdao && <DaoTabs item={game} sx={{ mt: 4 }} />} */}

      <Box sx={{ my: 2 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {GAME_NAME.mdao}
        </Typography>
        <SoulMembership {...soulMemberMDAOs} />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {GAME_NAME.project}
        </Typography>
        <SoulMembership {...soulMemberProjects} />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h5">{GAME_NAME.tasks}</Typography>
        <Typography variant="body1">[TBD]</Typography>
      </Box>
    </Layout>
  );
}
