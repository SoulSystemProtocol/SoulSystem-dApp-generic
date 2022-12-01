import { gql } from '@apollo/client';

const query = gql`
  query GameByHashQuery($id: ID!) {
    game(id: $id) {
      id
      name
      type
      role
      roles {
        id
        roleId
        name
        souls
        soulsCount
      }
      nominations {
        id
        createdDate
        nominator {
          id
        }
        nominated {
          id
        }
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
        }
      }
    }
  }
`;

export default query;
