import PaginatedList from 'components/PaginatedList';
import SoulMembersOfQuery from 'queries/SoulMembersOfQuery';

/**
 * Component: Entity's Soul list filtered by type & role & Stage
 */
export default function SoulMembersOf(props: any): JSX.Element {
  return (
    <PaginatedList
      entityName="soulParts"
      query={SoulMembersOfQuery}
      {...props}
    />
  );
}
