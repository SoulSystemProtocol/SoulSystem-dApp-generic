import { gql } from '@apollo/client';

const query = gql`
  query SoulByIdQuery($id: ID!) {
    soul(id: $id) {
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
      tags
      attrs {
        id
        role
        bEnd
      }
    }
  }
`;

export default query;
