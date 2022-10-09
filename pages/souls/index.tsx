import { useContext } from 'react';
import { Button } from '@mui/material';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/web3';
import Link from 'next/link';
// import useError from 'hooks/useError';
// import { APP_CONFIGS } from '../../constants';
// import PaginatedListGQ from 'components/PaginatedListGQ';
import Layout from '../../components/layout/Layout';
import SoulListGQ from '../../components/soul/SoulListGQ';
import { getPageTitle } from '../../utils';
import { PersonOutlineOutlined } from '@mui/icons-material';
import {
  addressToShortAddress,
  hexStringToJson,
  soulToFirstLastNameString,
} from 'utils/converters';
// import { resolveLink } from 'helpers/IPFS';
import { soulCardContent } from 'utils/cardContents';

const CONF = {
  PAGE_TITLE: 'Free Agents',
  TITLE: 'Free Agents',
  SUBTITLE: `Anyone can now be an NFT!`,
  ROUTE: 'souls',
};

/*
// Item Processing Function
const getCardContent = (item: any) => {
  let metadata = hexStringToJson(item.uriData);

  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata.image),
    avatarIcon: <PersonOutlineOutlined />,
    label: addressToShortAddress(item.owner),

    //DEPRECATE soulToFirstLastNameString() Usage here. That should be stored in  metadata.name
    title: metadata?.name || soulToFirstLastNameString(item),

    metadata,
    link: `/${CONF.ROUTE}/${item.id}`,
    // roles: [], // TODO: add roles logic
  };

  console.log('soul', ret);
  return ret;
};
*/

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
