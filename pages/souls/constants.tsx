import { PersonOutlineOutlined } from '@mui/icons-material';

import {
  addressToShortAddress,
  soulToFirstLastNameString,
  roleIdToName,
} from 'utils/converters';

export const SOUL_CONF = {
  PAGE_TITLE: '— Souls',
  TITLE: 'Souls',
  SUBTITLE: `Souls are your personal profile NFT.`,
  ROUTE: 'souls',
};

export const getCardContent = (item: any) => ({
  id: item.id,
  imgSrc: item.uriImage,
  avatarIcon: <PersonOutlineOutlined />,
  label: addressToShortAddress(item.owner),
  title: soulToFirstLastNameString(item),
  roles: [], // TODO: add roles logic
});
