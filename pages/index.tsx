import Layout from 'components/layout/Layout';
import { getPageTitle } from '../utils';
import SolidifyLanding from 'components/contentpages/Solidify';

/**
 * Configurable Home Page
 */
export default function Landing() {
  return (
    <Layout title={getPageTitle('Home')}>
      {process.env.NEXT_PUBLIC_HOMEPAGE === 'Solidify' ? (
        <SolidifyLanding />
      ) : (
        <SolidifyLanding />
      )}
    </Layout>
  );
}
