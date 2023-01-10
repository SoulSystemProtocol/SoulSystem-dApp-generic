import Layout from 'components/layout/Layout';
import SoulEdit from 'components/entity/soul/SoulEdit';
import { DataContext } from 'contexts/data';
import { useContext } from 'react';
import { getPageTitle } from 'utils';
import Loading from 'components/layout/Loading';
import { Web3Context } from 'contexts/Web3Context';
import WalletRequired from 'components/layout/WalletRequired';

/**
 * Page where account can edit soul.
 */
export default function SoulEditPage() {
  const { accountSoul } = useContext(DataContext);
  const { account } = useContext(Web3Context);

  return (
    <Layout title={getPageTitle('Edit Soul')}>
      {!account ? (
        <WalletRequired />
      ) : (
        <>{accountSoul ? <SoulEdit soul={accountSoul} /> : <Loading />}</>
      )}
    </Layout>
  );
}
