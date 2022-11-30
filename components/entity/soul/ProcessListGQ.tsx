import { gql } from '@apollo/client';
import PaginatedList from 'components/PaginatedList';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function ProcessListGQ(props: any) {
  //Soul Query - Role Optional
  const query = gql`
    query GetSouls(
      $type: String!
      $role: String
      $stage: Int
      $first: Int
      $skip: Int
    ) {
      souls(
        first: $first
        skip: $skip
        where: { type: $type, role: $role, stage: $stage }
      ) {
        id
        owner
        type
        uri
        # uriData
        metadata
        name
        uriImage
        uriFirstName
        uriLastName
        participantGame {
          id
          roles
        }
        participantProc {
          id
          roles
        }
      }
    }
  `;
  return <PaginatedList {...props} query={query} />;
}
