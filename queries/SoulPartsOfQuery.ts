import { gql } from '@apollo/client';

/**
 * Relation between a container and its memebers
 */
const query = gql`
  query SoulPartsOfQuery($id: ID!, $first: Int, $skip: Int) {
    soulParts(first: $first, skip: $skip, where: { aEnd_: { id: $id } })
    id
    qty
    role
    aEnd {
      id
      type
      role
      metadata
      name
    }
    bEnd {
      id
      name
      metadata
      owner
    }
  }
`;

export default query;
