import Layout from 'components/layout/Layout';
import SoulManage from 'components/entity/soul/SoulManage';
import { DataContext } from 'contexts/data';
import { useContext } from 'react';
import { getPageTitle } from 'utils';
import Loading from 'components/layout/Loading';

/**
 * Page where account can edit soul.
 */
export default function SoulEdit() {
  const { accountSoul } = useContext(DataContext);

  return (
    <Layout title={getPageTitle('Edit Soul')}>
      {accountSoul ? <SoulManage soul={accountSoul} /> : <Loading />}
    </Layout>
  );
}
