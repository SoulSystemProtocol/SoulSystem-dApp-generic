// import { gql } from '@apollo/client';
import PaginatedList from 'components/PaginatedList';
import querySoulToGame from 'queries/SoulGameQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulGames(props: any) {
  return (
    <PaginatedList
      {...props}
      entityName="gameParticipants"
      query={querySoulToGame}
    />
  );
}
