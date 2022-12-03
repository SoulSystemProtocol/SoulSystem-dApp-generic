import PaginatedList from 'components/PaginatedList';
import SoulPartsQuery from 'queries/SoulPartsQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulParts(props: any) {
  return (
    <PaginatedList entityName="soulParts" query={SoulPartsQuery} {...props} />
  );
}
