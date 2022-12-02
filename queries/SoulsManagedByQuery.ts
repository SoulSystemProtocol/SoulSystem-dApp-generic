import { gql } from '@apollo/client';

//Admin Of Souls
const query = gql`
  query SoulsManagedByQuery(
    $Bid: ID!
    $Arole: String
    $RelRole: String
    $first: Int
    $skip: Int
  ) {
    soulParts(
      first: $first
      skip: $skip
      where: { role: $RelRole, bEnd_: { id: $Bid }, aEnd_: { role: $Arole } }
    ) {
      id
      qty
      role
      aEnd {
        id
        owner
        type
        role
        metadata
        uriImage
        name
      }
    }
  }
`;

export default query;
