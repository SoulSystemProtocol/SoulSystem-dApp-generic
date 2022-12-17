import Layout from 'components/layout/Layout';
import SoulEdit from 'components/entity/soul/SoulEdit';
import { DataContext } from 'contexts/data';
import { useContext } from 'react';
import { getPageTitle } from 'utils';
import Loading from 'components/layout/Loading';

/**
 * Page where account can edit soul.
 */
export default function SoulEditPage() {
  const { accountSoul } = useContext(DataContext);

  return (
    <Layout title={getPageTitle('Edit Soul')}>
      {accountSoul ? <SoulEdit soul={accountSoul} /> : <Loading />}
    </Layout>
  );
}
