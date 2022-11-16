import PaginatedList from 'components/PaginatedList';
import SoulPartsQuery from 'queries/SoulPartsQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulParts(props: any) {
  return (
    <PaginatedList
      {...props}
      entityName="soulParts"
      query={SoulPartsQuery}
      gridMD={6}
      gridLG={4}
    />
  );
}
