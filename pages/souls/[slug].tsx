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
import { hexStringToJson, soulToFirstLastNameString } from 'utils/converters';
import SoulMembership from 'components/soul/SoulMembership';
import { getPageTitle } from 'utils';
// import { resolveLink } from 'utils/metadata';
import { GAME_DESC, GAME_NAME, GAME_TYPE } from 'constants/contracts';
// import { daoPartCardContent } from 'utils/cardContents';
import { resolveLink } from 'utils/metadata';
import { Box, Typography } from '@mui/material';

// eslint-disable-next-line prettier/prettier
interface SoulProps { }

/**
 * Page with soul details.
 */
// eslint-disable-next-line prettier/prettier
export default function SoulDetailPage({ }: SoulProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getSoulById } = useSoul();
  const [soul, setSoul] = useState<Soul | null>(null);

  // Item Processing Function
  const daoPartCardContent = (item: any) => {
    let metadata = hexStringToJson(item.entity.metadata);
    let ret = {
      id: item.entity.id,
      imgSrc: resolveLink(metadata.image),
      label: metadata?.description,
      title: metadata?.name,
      metadata: metadata,
      link: `/game/${item.entity.id}`,
    };

    console.log('[DEV] daoPartCardContent() item', { item, ret });

    return ret;
  };

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
      gameRole: GAME_TYPE.mdao,
    },
    getCardContent: daoPartCardContent,
    // renderActions,
    // subtitle: CONF.SUBTITLE,
    // title: CONF.TITLE,
  };

  const soulMemberProjects = {
    variables: {
      id: soul?.id,
      gameRole: GAME_TYPE.project,
    },
    getCardContent: daoPartCardContent,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <SoulDetail soul={soul} />


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
