import { gql } from '@apollo/client';

/**
 * Soul Query By Type, Role Optional
 */
const query = gql`
  query GetSouls($type: String!, $role: String, $first: Int, $skip: Int) {
    souls(first: $first, skip: $skip, where: { type: $type, role: $role }) {
      id
      owner
      type
      uri
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

export default query;
