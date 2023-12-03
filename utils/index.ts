import { APP_CONFIGS } from '../constants/app';
import { runSubgraphQuery } from './subgraph';
const manifest = require('manifest.json');

///Generate Page Title
export const getPageTitle = (pageName: string) =>
  `${pageName} ${APP_CONFIGS.TITLE_SEP} ${manifest.name}`;

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
