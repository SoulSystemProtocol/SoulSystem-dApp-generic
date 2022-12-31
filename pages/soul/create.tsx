import Layout from 'components/layout/Layout';
import SoulEdit from 'components/entity/soul/SoulEdit';
import { getPageTitle } from 'utils';

/**
 * Page where account can create soul.
 */
export default function SoulCreate() {
  return (
    <Layout title={getPageTitle('Create Soul')}>
      <SoulEdit />
    </Layout>
  );
}
