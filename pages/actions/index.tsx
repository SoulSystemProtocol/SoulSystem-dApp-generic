import Layout from 'components/layout/Layout';
import ActionsDisplay from 'components/rules/ActionsDisplay';
import { getPageTitle } from 'utils';

const CONF = {
  PAGE_TITLE: 'Actions Repository',
  TITLE: 'Actions Repository',
  SUBTITLE: `General actions that a game admin can use to create the game's rules`,
};

/**
 * Component: Rule Managment
 */
export default function ActionManagePage(): JSX.Element {
  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <ActionsDisplay />
    </Layout>
  );
}
