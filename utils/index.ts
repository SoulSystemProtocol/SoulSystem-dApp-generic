import { APP_CONFIGS } from '../constants/app';
import { indexer } from 'services/indexer/client';
import manifest from '../public/manifest.json';

///Generate Page Title
export const getPageTitle = (pageName: string) =>
  `${pageName} ${APP_CONFIGS.TITLE_SEP} ${manifest.name}`;

/// Pagination Helper
export const getPagination = (page: any) => (page - 1) * APP_CONFIGS.PAGE_SIZE;

/// Get Soul ID by Account Address
export const getSBTForAccount = async (
  address: string,
): Promise<string | undefined> => {
  return indexer.getSBTForAccount(address);
};
