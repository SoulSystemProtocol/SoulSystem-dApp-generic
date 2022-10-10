// import { gql } from '@apollo/client';
import PaginatedListGQ from 'components/PaginatedListGQ';
import querySoulToGame from 'queries/SoulGameQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulGames(props: any) {
  return (
    <PaginatedListGQ
      {...props}
      entityName="gameParticipants"
      query={querySoulToGame}
    />
  );
}
