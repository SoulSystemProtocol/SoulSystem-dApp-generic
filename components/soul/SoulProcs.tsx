// import { gql } from '@apollo/client';
import PaginatedList from 'components/PaginatedList';
import querySoulToProc from 'queries/SoulProcQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulGames(props: any) {
  return (
    <PaginatedList
      {...props}
      entityName="procParticipants"
      query={querySoulToProc}
    />
  );
}
