import Layout from 'components/layout/Layout';
import SoulManage from 'components/entity/soul/SoulManage';
import { getPageTitle } from 'utils';

/**
 * Page where account can create soul.
 */
export default function SoulCreate() {
  return (
    <Layout title={getPageTitle('Create Soul')}>
      <SoulManage />
    </Layout>
  );
}
