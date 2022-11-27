import Layout from 'components/layout/Layout';
import SoulManage from 'components/entity/soul/SoulManage';
import { DataContext } from 'contexts/data';
import { useContext } from 'react';
import { getPageTitle } from 'utils';

/**
 * Page where account can edit soul.
 */
export default function SoulEdit() {
  const { accountSoul } = useContext(DataContext);

  return (
    <Layout title={getPageTitle('Edit Soul')}>
      {accountSoul ? (
        <SoulManage soul={accountSoul} />
      ) : (
        <div>Failed to load Soul</div>
      )}
    </Layout>
  );
}
