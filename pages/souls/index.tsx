import { useContext } from 'react';
import { Button } from '@mui/material';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { getPageTitle } from '../../utils';
import { soulCardContent } from 'utils/cardContents';
import PaginatedList from 'components/PaginatedList';
import SoulsByTypeQuery from 'queries/SoulsByTypeQuery';

const CONF = {
  PAGE_TITLE: 'SBT Profiles',
  TITLE: 'SBT Profiles',
  SUBTITLE: `You can now be an NFT! interact with the soul-system, mint yourself a soulbound NFT avatar`,
  ROUTE: 'souls',
};

/**
 * Page for a list of souls
 */
export default function SoulsPage({ type = '' }: any) {
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);

  const renderActions = account && !accountSoul && (
    <Link href={`/soul/create`} passHref>
      <Button variant="outlined">Create Soul</Button>
    </Link>
  );

  // Props for GQL List
  const soulsListPropsGQ = {
    variables: { type },
    getCardContent: soulCardContent,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedList {...soulsListPropsGQ} query={SoulsByTypeQuery} />
    </Layout>
  );
}
