import { gql } from '@apollo/client';

const query = gql`
  query SoulByIdQuery($id: ID!) {
    soul(id: $id) {
      id
      owner
      type
      role
      uri
      uriData
      metadata
      uriImage
      uriFirstName
      uriLastName
      name
    }
  }
`;
/// REMOVED
// participantGame {
//   id
//   roles
// }
// participantProc {
//   id
//   roles
// }
export default query;
