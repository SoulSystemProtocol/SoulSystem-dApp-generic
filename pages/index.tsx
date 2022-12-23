import Layout from 'components/layout/Layout';
import { getPageTitle } from '../utils';
import SolidifyLanding from 'components/contentpages/Solidify';

/**
 * Home Page
 */
export default function Landing() {
  return (
    <Layout title={getPageTitle('Home')}>
      <SolidifyLanding />
    </Layout>
  );
}
