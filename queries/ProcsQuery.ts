import { gql } from '@apollo/client';

/** [WIP]
 * Get Processed
 */
const query = gql`
  query ProcByHashQuery($id: ID!) {
    claims(id: $id) {
      id
      name
      stage
      type
      game {
        id
        name
        type
        role
      }
      roles {
        id
        name
        roleId
        souls
        soulsCount
      }
      nominations {
        id
        createdDate
        nominator {
          id
          owner
          type
        }
        nominated {
          id
          owner
          type
        }
        uri
        status
      }
      posts {
        id
        createdDate
        entityRole
        uri
        metadata
        author {
          id
          owner
          name
          uriImage
        }
      }
    }
  }
`;

export default query;
