import { gql } from '@apollo/client';

/**
 * Unsafe GQL Injector
 */
const injectedGQL = (where: string[] = []) => {
  /**
   * Soul Query By Type, Role, & Text
   */
  const query = gql`
    query SoulOpinions($first: Int, $skip: Int) {
      soulOpinions(first: $first, skip: $skip, where: { ${where.join(', ')} }) {
        id
        role
        aEnd {
          id
        }
        bEnd
        bSoul {
          id
        }
        bContract
      }
    }
  `;
  return query;
};

// export default query;
export default injectedGQL;
