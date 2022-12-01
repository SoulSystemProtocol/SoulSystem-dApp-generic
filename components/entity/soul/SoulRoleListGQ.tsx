import PaginatedList from 'components/PaginatedList';
import SoulsByTypeRoleQuery from 'queries/SoulsByTypeRoleQuery';

/** DEPRECATED
 * Component: Soul list filtered by type & role
 */
export default function SoulRoleListGQ(props: any) {
  return <PaginatedList {...props} query={SoulsByTypeRoleQuery} />;
}
