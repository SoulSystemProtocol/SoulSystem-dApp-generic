import { gql } from '@apollo/client';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/web3';
import Link from 'next/link';
// import useError from 'hooks/useError';
// import useSoul from 'hooks/useSoul';
// import useSouls from 'hooks/graph/useSouls';
// import Soul from 'classes/Soul';
// import { SOUL_TYPE } from 'constants/contracts';
// import { APP_CONFIGS } from '../../constants';
import Layout from '../../components/layout/Layout';
import PaginatedListGQ from 'components/PaginatedListGQ';
import { getPageTitle, getPagination } from '../../utils';
import { PersonOutlineOutlined } from '@mui/icons-material';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from 'utils/converters';

const CONF = {
  PAGE_TITLE: 'Souls',
  TITLE: 'Souls',
  SUBTITLE: `Souls are your personal profile NFT.`,
  ROUTE: 'souls',
};

const getCardContent = (item: any) => ({
  id: item.id,
  imgSrc: item.uriImage,
  avatarIcon: <PersonOutlineOutlined />,
  label: addressToShortAddress(item.owner),
  title: soulToFirstLastNameString(item),
  roles: [], // TODO: add roles logic
});

const QUERY = gql`
  query GetSouls($type: String!, $first: Int, $skip: Int) {
    souls(first: $first, skip: $skip, where: { type: $type }) {
      id
      owner
      type
      uri
      uriData
      uriImage
      uriFirstName
      uriLastName
      participantGame {
        id
        roles
      }
      participantProc {
        id
        roles
      }
    }
  }
`;

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
    query: QUERY,
    variables: {
      type,
    },
    getCardContent,
    // card config
    baseRoute: CONF.ROUTE,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedListGQ {...soulsListPropsGQ} />
    </Layout>
  );
}
