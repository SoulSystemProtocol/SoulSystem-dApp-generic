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
      attrs {
        id
        role
        bEnd
      }
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
