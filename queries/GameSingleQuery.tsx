import { gql } from '@apollo/client';

const query = gql`
  query GameSingleQuery($id: ID!) {
    game(id: $id) {
      id
      name
      type
      role
      uri
      uriData
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
        author {
          id
          owner
        }
        uri
        metadata
      }
    }
  }
`;

export default query;
