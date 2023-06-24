import Layout from 'components/layout/Layout';
import SoulEdit from 'components/entity/soul/SoulEdit';
import { getPageTitle } from 'utils';

/**
 * Page for creating a new Soul Profile
 */
export default function SoulCreate(): JSX.Element {
  return (
    <Layout title={getPageTitle('Create Soul')}>
      <SoulEdit />
    </Layout>
  );
}
