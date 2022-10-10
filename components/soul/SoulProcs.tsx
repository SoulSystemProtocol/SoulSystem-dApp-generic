// import { gql } from '@apollo/client';
import PaginatedListGQ from 'components/PaginatedListGQ';
import querySoulToProc from 'queries/SoulProcQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulGames(props: any) {
  return (
    <PaginatedListGQ
      {...props}
      entityName="procParticipants"
      query={querySoulToProc}
    />
  );
}
