import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/web3';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';

import Layout from '../../components/layout/Layout';
import PaginatedList from 'components/PaginatedList';
import { SOUL_TYPE } from 'constants/contracts';
import { APP_CONFIGS } from '../../constants';
import { getPageTitle, getPagination } from '../../utils';
import Soul from 'classes/Soul';
import { PersonOutlineOutlined } from '@mui/icons-material';

import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from 'utils/converters';

const SOUL_CONF = {
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

/**
 * Page for a list of souls
 */
export default function SoulsPage({}: any) {
  const [souls, setSouls] = useState<Array<Soul> | null>(null);
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);
  const { getSouls } = useSoul();
  const { handleError } = useError();

  async function loadData(page: any) {
    try {
      // Update states
      setSouls(null);
      // Load souls by page params
      const souls = await getSouls(
        undefined,
        undefined,
        SOUL_TYPE.created_by_not_contract,
        APP_CONFIGS.PAGE_SIZE,
        getPagination(page),
      );
      setSouls(souls);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1);
  }, []);

  const renderActions = account && !accountSoul && (
    <Link href={`/${SOUL_CONF.ROUTE}/create`} passHref>
      <Button variant="outlined">Create Soul</Button>
    </Link>
  );

  // Props
  const soulsListProps = {
    baseRoute: SOUL_CONF.ROUTE,
    data: souls,
    loadData,
    renderActions,
    subtitle: SOUL_CONF.SUBTITLE,
    title: SOUL_CONF.TITLE,
    // card config
    getCardContent,
  };

  return (
    <Layout title={getPageTitle(SOUL_CONF.PAGE_TITLE)}>
      <PaginatedList {...soulsListProps} />
    </Layout>
  );
}
