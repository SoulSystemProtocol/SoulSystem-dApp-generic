import { WorkOutlineOutlined } from '@mui/icons-material';

export const CONF = {
  PAGE_TITLE: 'Hackathons',
  TITLE: 'Hackathons',
  SUBTITLE: ``,
  ROUTE: 'events',
};

export const getCardContent = (item: any) => ({
  id: item.id,
  imgSrc: item.uriData.image,
  avatarIcon: <WorkOutlineOutlined />,
  label: item.uriData.description,
  title: item.name,
});
