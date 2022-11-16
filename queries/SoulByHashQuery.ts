import { gql } from '@apollo/client';

const query = gql`
  query SoulByHashQuery($hash: String!) {
    # soul(owner: $hash) {
    souls(where: { owner: $hash }) {
      id
      owner
      type
      role
      uri
      metadata
      uriImage
      uriFirstName
      uriLastName
    }
  }
`;

export default query;
