import { APP_CONFIGS } from '../constants';
import axios from 'axios';

///Generate Page Title
export const getPageTitle = (pageName: string) =>
  `${APP_CONFIGS.NAME} ${APP_CONFIGS.TITLE_SEP} ${pageName}`;

/// Pagination Helper
export const getPagination = (page: any) => (page - 1) * APP_CONFIGS.PAGE_SIZE;

/// Get Soul ID by Account Address
export const getSBTForAccount = async (
  address: string,
): Promise<string | undefined> => {
  const query = `
  query GetSBTId($address: ID!) {
    account(id: $address) {
      sbt {
        id
      }
    }
  }
  `;
  const response = await runSubgraphQuery(query, { address });
  // console.log('Ran Query and got:', query, response);
  return response?.account?.sbt?.id;
};

/// Runs a subgraph query
export async function runSubgraphQuery(query: string, variables: any = {}) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SUBGRAPH_API || '',
      { query, variables },
    );
    if (response.data.errors) {
      throw new Error(
        `Error making subgraph query: ${JSON.stringify(response.data.errors)}`,
      );
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      `Could not query the subgraph: ${JSON.stringify(error.message)}`,
    );
  }
}
