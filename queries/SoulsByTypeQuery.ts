import { gql } from '@apollo/client';

/**
 * Get Souls by Type Query - Type Optional
 */
const query = gql`
  query SoulsByTypeQuery($type: String!, $first: Int, $skip: Int) {
    souls(first: $first, skip: $skip, where: { type: $type }) {
      id
      owner
      type
      uri
      metadata
      name
      uriImage
      uriFirstName
      uriLastName
    }
  }
`;

export default query;
