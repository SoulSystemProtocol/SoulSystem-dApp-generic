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

const CONF = {
  PAGE_TITLE: 'Souls',
  TITLE: 'Souls',
  SUBTITLE: `Souls are your personal profile NFT.`,
  ROUTE: 'souls',
};

const getCardContent = (item: any) => {
  let ret = {
    id: item.id,
    imgSrc: item.uriImage,
    avatarIcon: <PersonOutlineOutlined />,
    label: addressToShortAddress(item.owner),
    title: soulToFirstLastNameString(item),
    metadata: hexStringToJson(item.uriData),
    link: `/${CONF.ROUTE}/${item.id}`,
    // roles: [], // TODO: add roles logic
  };
  return ret;
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
    getCardContent,
    // baseRoute: CONF.ROUTE,   REDUNDANT - just use the link element on the getCardContent function
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
