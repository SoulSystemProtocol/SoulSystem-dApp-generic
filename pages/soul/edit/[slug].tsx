import Layout from 'components/layout/Layout';
import SoulEdit from 'components/entity/soul/SoulEdit';
import { useContext } from 'react';
import { getPageTitle } from 'utils';
import {
  SelectedSoulContext,
  SelectedSoulProvider,
} from 'contexts/SelectedSoul';
import { useRouter } from 'next/router';

/**
 * Edit Soul Page
 */
export default function SoulSinglePageEdit(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <SelectedSoulProvider slug={slug}>
      <SoulEditPageContent />
    </SelectedSoulProvider>
  );
}

/**
 * Edit Soul Page Content
 */
function SoulEditPageContent(): JSX.Element {
  const { soul } = useContext(SelectedSoulContext);
  return (
    <Layout title={getPageTitle('Edit Soul')}>
      {soul && <SoulEdit soul={soul} />}
    </Layout>
  );
}
