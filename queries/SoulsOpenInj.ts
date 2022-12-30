import { gql } from '@apollo/client';

/**
 * Unsafe GQL Injector
 */
const injectedGQL = (where: string) => {
  /**
   * Soul Query By Type, Role, & Text
   */
  const query = gql`
    query SoulsOpenQuery($first: Int, $skip: Int) {
      souls(first: $first, skip: $skip, where: { ${where} }) {
        id
        owner
        type
        uri
        metadata
        name
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
  return query;
};

// const query = injectedGQL(`{ type: "" }`);

// export default query;
export default injectedGQL;
