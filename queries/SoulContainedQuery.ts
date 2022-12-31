import { gql } from '@apollo/client';

/**
 * Get Soul's Contained Souls
 */
const query = gql`
  query SoulContainedQuery($Bid: ID!, $Arole: String, $first: Int, $skip: Int) {
    soulAssocs(
      first: $first
      skip: $skip
      where: { role: "container", aEnd_: { role: $Arole }, bEnd_: { id: $Bid } }
    ) {
      role
      aEnd {
        id
        owner
        type
        role
        uri
        metadata
        uriImage
        name
      }
      bEnd {
        id
        role
      }
      role
    }
  }
`;
export default query;
