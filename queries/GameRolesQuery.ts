import { gql } from '@apollo/client';

/** [DEPRECATED] use SoulPartsQuery
 * Get Roles (token types) by Game ID
 */
const query = gql`
  query GameRolesQuery($id: ID!, $first: Int, $skip: Int) {
    gameRoles(first: $first, skip: $skip, where: { ctx_: { id: $id } }) {
      id
      roleId
      name
      souls
      metadata
    }
  }
`;

export default query;
