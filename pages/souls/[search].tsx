import { useContext } from 'react';
import { Button } from '@mui/material';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { getPageTitle } from '../../utils';
import { soulCardContent } from 'utils/cardContents';
import PaginatedList from 'components/PaginatedList';
import SoulSearchBox from 'components/entity/soul/SoulSearchBox';
import SoulsOpenInj from 'queries/SoulsOpenInj';
import { useRouter } from 'next/router';

/**
 * Page for a list of souls
 */
export default function SoulsSearch({ type = '' }: any) {
  const router = useRouter();
  const { search } = router.query;
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);

  const CONF = {
    PAGE_TITLE: search ? `Soul Search ` : 'SBT Profiles',
    TITLE: search ? `Results for: ${search}` : 'SBT Profiles',
    SUBTITLE: `You can now be an NFT! interact with the soul-system, mint yourself a soulbound NFT avatar`,
    ROUTE: 'souls',
  };

  const renderActions = account && !accountSoul && (
    <Link href={`/soul/create`} passHref>
      <Button variant="outlined">Create Soul</Button>
    </Link>
  );

  //Query Structure: { type: $type, role: $role, searchField_contains_nocase: $text }
  let queryFilters: string[] = [];
  if (type !== undefined) queryFilters.push(`type: "${type}" `);
  // role && queryFilters.push(`role: "${role}""`);
  search && queryFilters.push(`searchField_contains_nocase: "${search}"`);
  // let searchQueryParams = ` type: "${type}" `;
  let searchQueryParams = queryFilters.join(', ');
  console.log('Soul searchQueryParams', searchQueryParams);

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <SoulSearchBox
        label="Soul Search"
        sx={{ width: { xs: 1, md: 520 }, margin: '30px auto 40px' }}
        value={search as string}
        onChange={(id) => {
          console.log('Search Changed -- Go to Soul:', id);
          router.push('/soul/' + id);
        }}
        onKeyDown={(e: any) => {
          if (e.keyCode === 13) {
            router.push('/souls/' + e.target.value);
          }
        }}
      />
      <PaginatedList
        getCardContent={soulCardContent}
        renderActions={renderActions}
        subtitle={CONF.SUBTITLE}
        title={CONF.TITLE}
        query={SoulsOpenInj(searchQueryParams)}
      />
    </Layout>
  );
}
