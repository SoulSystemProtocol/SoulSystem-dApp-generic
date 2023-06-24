import Layout from 'components/layout/Layout';
import { getPageTitle } from '../utils';
import SolidifyLanding from 'components/contentpages/Solidify';
import RoyVerse from 'components/contentpages/RoyVerse';
import Communiverse from 'components/contentpages/Communiverse';

/**
 * Configurable Home Page
 */
export default function Landing() {
  return (
    <Layout title={getPageTitle('Home')}>
      {process.env.NEXT_PUBLIC_HOMEPAGE === 'RoyVerse' ? (
        <RoyVerse />
      ) : process.env.NEXT_PUBLIC_HOMEPAGE === 'Communiverse' ? (
        <Communiverse />
      ) : (
        <SolidifyLanding />
      )}
    </Layout>
  );
}
