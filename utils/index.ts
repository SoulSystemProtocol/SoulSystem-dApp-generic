import { APP_CONFIGS } from '../constants';

export const getPageTitle = (pageName: string) =>
  `${APP_CONFIGS.NAME} ${APP_CONFIGS.TITLE_SEP} ${pageName}`;

export const getPagination = (page: any) => (page - 1) * APP_CONFIGS.PAGE_SIZE;
