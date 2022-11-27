import { gql } from '@apollo/client';
import PaginatedList from 'components/PaginatedList';

/** UNUSED
 * Component: Soul list filtered by type & role & Stage
 */
export default function ProjectTaskListGQ(props: any) {
  //Soul Query - Role Optional
  const query = gql`
    query GetProjectTasks($game: ID!, $first: Int, $skip: Int) {
      claims(
        first: $first
        skip: $skip
        where: { role: "bounty", game: $game }
      ) {
        id
        name
        stage
        type
        game {
          name
          uriData
        }
        roles {
          id
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
  return <PaginatedList {...props} query={query} />;
}
