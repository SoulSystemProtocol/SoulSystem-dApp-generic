import { gql } from '@apollo/client';

const query = gql`
  query SoulsByIdQuery($ids: [ID]!, $first: Int, $skip: Int) {
    souls(first: $first, skip: $skip, where: { id_in: $ids }) {
      id
      owner
      type
      role
      uri
      metadata
      uriImage
      uriFirstName
      uriLastName
      name
    }
  }
`;

export default query;
