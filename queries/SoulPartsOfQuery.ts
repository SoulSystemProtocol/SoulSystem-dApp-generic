import { gql } from '@apollo/client';

/**
 * Relation between a container and its memebers
 */
const query = gql`
  query SoulPartsOfQuery($id: ID!, $first: Int, $skip: Int) {
    soulParts(first: $first, skip: $skip, where: { aEnd_: { id: $id } }) {
      id
      qty
      role
      bEnd {
        id
        name
        metadata
        owner
      }
    }
  }
`;

export default query;
