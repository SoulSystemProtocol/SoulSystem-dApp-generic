import { gql } from '@apollo/client';

const query = gql`
  query SoulSingle($id: ID!) {
    soul(id: $id) {
      id
      owner
      type
      uri
      uriData
      uriImage
      uriFirstName
      uriLastName
      participantGame {
        id
        roles
      }
      participantProc {
        id
        roles
      }
    }
  }
`;

export default query;
