import PaginatedList from 'components/PaginatedList';
import SoulPartsOfQuery from 'queries/SoulPartsOfQuery';

/**
 * Component: Entity's Soul list filtered by type & role & Stage
 */
export default function SoulParts(props: any): JSX.Element {
  return (
    <PaginatedList entityName="soulParts" query={SoulPartsOfQuery} {...props} />
  );
}
