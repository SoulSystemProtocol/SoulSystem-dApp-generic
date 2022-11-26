import { gql } from '@apollo/client';

/**
 * Get Roles (token types) by Game ID
 */
const query = gql`
  query ProcRolesQuery($id: ID!, $first: Int, $skip: Int) {
    procRoles(first: $first, skip: $skip, where: { ctx_: { id: $id } }) {
      id
      roleId
      name
      souls
    }
  }
`;

export default query;
