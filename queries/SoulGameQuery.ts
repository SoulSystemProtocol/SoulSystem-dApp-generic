import { gql } from '@apollo/client';

/** [DEPRECATED]
 * Soul Query - Role Optional
 */
const query = gql`
  query SoulGamesQuery($id: ID!, $entRole: String, $first: Int, $skip: Int) {
    gameParticipants(
      first: $first
      skip: $skip
      where: { sbt_: { id: $id }, entity_: { role: $entRole } }
    ) {
      id
      roles
      entity {
        id
        name
        type
        role
      }
      sbt {
        id
        name
        type
      }
    }
  }
`;

export default query;
