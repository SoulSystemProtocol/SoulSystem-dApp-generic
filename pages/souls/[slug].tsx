import Layout from 'components/layout/Layout';
import SoulDetail from 'components/entity/soul/SoulDetail';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { soulToFirstLastNameString } from 'utils/converters';
import { getPageTitle } from 'utils';
import { GAME_DESC } from 'constants/contracts';
import { Box, Typography } from '@mui/material';
import DisplayPOAP from 'components/web3/DisplayPOAP';
import SoulGameView from 'components/entity/soul/SoulGameView';
import SoulAffiliations from 'components/entity/soul/SoulAffiliations';
import useSoulById from 'hooks/useSoulById';
import useSoulByHash from 'hooks/useSoulByOwner';
import { isNumber } from 'hooks/utils';

/**
 * Component: Single Soul Page
 */
export default function SoulSinglePage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  return isNumber(slug as string) ? (
    <SoulSingleById id={slug} />
  ) : (
    <SoulSingleByHash hash={slug} />
  );
}

/**
 * Component: Single Soul By Id
 */
function SoulSingleById({ id }: any): JSX.Element {
  const { soul, loading, error } = useSoulById(id as string);
  return <SoulSinglePageContent soul={soul} />;
}

/**
 * Component: Single Soul By Hash
 */
function SoulSingleByHash({ hash }: any): JSX.Element {
  const { soul, loading, error } = useSoulByHash(hash as string);
  return <SoulSinglePageContent soul={soul} />;
}

/**
 * Component: Single Soul Page Content
 */
function SoulSinglePageContent({ soul }: any): JSX.Element {
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
      {soul?.type == 'GAME' && <SoulGameView soul={soul} sx={{ mt: 4 }} />}
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
