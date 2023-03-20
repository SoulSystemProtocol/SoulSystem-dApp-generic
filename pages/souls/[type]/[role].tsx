import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import Loading from 'components/layout/Loading';
import SoulsSearch from '../search';

/**
 * Souls Page
 * By type & role
 */
export default function SoulsPage(): JSX.Element {
  const router = useRouter();
  const { role, type, slug } = router.query;

  //Loading
  if (!router.isReady)
    return (
      <Layout title={'Soul'}>
        <Loading />
      </Layout>
    );
  //Soul Search
  if (type == 'search') return <SoulsSearch search={role} />;
  //Missing Input
  if (!role)
    return <Layout title={'Role Not Specified'}>Please Specify Role</Layout>;
  //Soul List
  return <SoulsSearch type={type} role={role} displaySearchBox={false} />;
}
