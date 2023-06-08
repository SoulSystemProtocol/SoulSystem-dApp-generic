import { nameEntity } from 'helpers/utils';
import { getPageTitle } from '../../utils';
import Layout from 'components/layout/Layout';

const CONF = {
  PAGE_TITLE: nameEntity('review', true),
  TITLE: nameEntity('dao', true),
  // SUBTITLE: "?",
};

/**
 * Page for a list of mDAO Games
 */
export default function ReviewsPage({}: any) {
  return <Layout title={getPageTitle(CONF.PAGE_TITLE)}>Reviews</Layout>;
}
