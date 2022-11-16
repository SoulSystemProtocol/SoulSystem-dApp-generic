import { gql } from '@apollo/client';

/**
 * Relation Between a Soul and a Container Role
 * $id member soulId
 * $role container soul role
 */
const query = gql`
  query SoulPartsQuery($id: ID!, $role: String, $first: Int, $skip: Int) {
    soulParts(
      first: $first
      skip: $skip
      where: { bEnd_: { id: $id }, aEnd_: { role: $role } }
    ) {
      id
      qty
      role
      aEnd {
        id
        role
        metadata
        name
        owner
      }
      bEnd {
        id
        name
        metadata
      }
    }
  }
`;

export default query;
