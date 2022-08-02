import { WorkOutlineOutlined } from '@mui/icons-material';

export const PROJECT_CONF = {
  PAGE_TITLE: 'Projects',
  TITLE: 'Projects',
  SUBTITLE: `Projects are companies and organizations that need some work done.`,
  ROUTE: 'projects',
};

export const getCardContent: any = (item: any) => ({
  id: item.id,
  imgSrc: item.uriData?.image,
  avatarIcon: <WorkOutlineOutlined />,
  label: item.uriData?.description,
  title: item.name,
});
