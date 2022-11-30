import { gql } from '@apollo/client';
import PaginatedList from 'components/PaginatedList';

/**
 * Component: Soul list filtered by type only
 */
export default function SoulTypeListGQ(props: any) {
  //Soul Query - Role Optional  //TODO: Move to a separate file
  const query = gql`
    query GetSouls($type: String!, $first: Int, $skip: Int) {
      souls(first: $first, skip: $skip, where: { type: $type }) {
        id
        owner
        type
        uri
        uriData
        metadata
        name
        uriImage
        uriFirstName
        uriLastName
      }
    }
  `;
  return <PaginatedList {...props} query={query} />;
}
