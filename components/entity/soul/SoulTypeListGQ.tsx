import PaginatedList from 'components/PaginatedList';
import SoulsByTypeQuery from 'queries/SoulsByTypeQuery';

/**
 * Component: Soul list filtered by type only
 */
export default function SoulTypeListGQ(props: any) {
  return <PaginatedList {...props} query={SoulsByTypeQuery} />;
}
