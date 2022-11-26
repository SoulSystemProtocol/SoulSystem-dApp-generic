import Layout from 'components/layout/Layout';
import SoulManage from 'components/entity/soul/SoulManage';

/**
 * Page where account can create soul.
 */
export default function SoulCreate() {
  return (
    <Layout title={process.env.NEXT_PUBLIC_APP_NAME + ' — Create Soul'}>
      <SoulManage />
    </Layout>
  );
}
