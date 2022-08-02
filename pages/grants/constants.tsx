import { WorkOutlineOutlined } from '@mui/icons-material';

export const GRANTS_CONF = {
  PAGE_TITLE: 'Grants',
  TITLE: 'Grants',
  SUBTITLE: ``,
  ROUTE: 'grants',
};

export const getCardContent = (item: any) => ({
  id: item.id,
  imgSrc: item.uriData.image,
  avatarIcon: <WorkOutlineOutlined />,
  label: item.uriData.description,
  title: item.name,
});
