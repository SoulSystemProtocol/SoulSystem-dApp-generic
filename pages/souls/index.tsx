import { useContext } from 'react';
import { Button } from '@mui/material';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SoulListGQ from '../../components/entity/soul/SoulListGQ';
import { getPageTitle } from '../../utils';
import { soulCardContent } from 'utils/cardContents';

const CONF = {
  PAGE_TITLE: 'SBT Profiles',
  TITLE: 'SBT Profiles',
  SUBTITLE: `You can now be an NFT!`,
  ROUTE: 'souls',
};

/**
 * Page for a list of souls
 */
export default function SoulsPage({ type = '' }: any) {
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);

  const renderActions = account && !accountSoul && (
    <Link href={`/${CONF.ROUTE}/create`} passHref>
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
      <SoulListGQ {...soulsListPropsGQ} />
    </Layout>
  );
}
