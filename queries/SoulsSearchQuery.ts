import { gql } from '@apollo/client';

/**
 * Soul Query By Type, Role, & Text
 */
const query = gql`
  query SoulsSearchQuery(
    $type: String
    $role: String
    $text: String
    $first: Int
    $skip: Int
  ) {
    souls(
      first: $first
      skip: $skip
      where: { type: $type, role: $role, searchField_contains_nocase: $text }
    ) {
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
