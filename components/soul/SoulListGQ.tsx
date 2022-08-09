import { gql } from '@apollo/client';
import PaginatedListGQ from 'components/PaginatedListGQ';

/**
 * A shared component with a list of souls.
 * Any kind of souls.
 */
export default function SoulListGQ(props: any) {
  //Soul Query - Role Optional
  const query = props?.variables?.role
    ? gql`
        query GetSouls($type: String!, $role: String, $first: Int, $skip: Int) {
          souls(
            first: $first
            skip: $skip
            where: { type: $type, role: $role }
          ) {
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
      `
    : gql`
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
  return <PaginatedListGQ {...props} query={query} />;
}
