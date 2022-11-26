import PaginatedList from 'components/PaginatedList';
import querySoulToProc from 'queries/SoulProcQuery';

/**
 * Component: Soul to Process Relation
 */
export default function SoulProcs(props: any) {
  return (
    <PaginatedList
      {...props}
      entityName="procParticipants"
      query={querySoulToProc}
      gridMD={12}
      gridLG={12}
    />
  );
}
