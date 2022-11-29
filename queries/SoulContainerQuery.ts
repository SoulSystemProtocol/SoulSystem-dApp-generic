import { gql } from '@apollo/client';

/**
 * Get Soul's Container Image
 */
const query = gql`
  query SoulContainerQuery($id: ID!) {
    soulAssocs(where: { aEnd_: { id: $id }, role: "container" }, first: 1) {
      id
      role
      aEnd {
        id
      }
      bEnd {
        id
        uriImage
      }
    }
  }
`;
export default query;
