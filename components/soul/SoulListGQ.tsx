import { gql } from '@apollo/client';
import PaginatedListGQ from 'components/PaginatedListGQ';

const query = gql`
  query GetSouls($type: String!, $first: Int, $skip: Int) {
    souls(first: $first, skip: $skip, where: { type: $type }) {
      id
      owner
      type
      uri
      uriData
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

/**
 * A shared component with a list of souls.
 * Any kind of souls.
 */
export default function SoulListGQ(props: any) {
  return <PaginatedListGQ {...props} query={query} />;
}
