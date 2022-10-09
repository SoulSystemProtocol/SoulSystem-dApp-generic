import {
  PersonOutlineOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  addressToShortAddress,
  hexStringToJson,
  soulToFirstLastNameString,
} from './converters';
import { resolveLink } from './metadata';

// Item Processing Function
export const soulCardContent = (item: any) => {
  let metadata = hexStringToJson(item.uriData);

  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata.image),
    avatarIcon: <PersonOutlineOutlined />,
    label: addressToShortAddress(item.owner),

    //DEPRECATE soulToFirstLastNameString() Usage here. That should be stored in  metadata.name
    title: metadata?.name || soulToFirstLastNameString(item),

    metadata,
    link: `/souls/${item.id}`,
    // roles: [], // TODO: add roles logic
  };

  // console.log('soul', ret);
  return ret;
};

// Game Card Processing
export const gameCardContent = (item: any) => {
  let metadata = hexStringToJson(item.uriData);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/game/${item.owner}`,
    avatarIcon: <WorkOutlineOutlined />,
  };
  // ret.avatarIcon = (<WorkOutlineOutlined />);
  return ret;
};

// Process Card Processing
export const processCardContent = (item: any) => {
  let metadata = hexStringToJson(item.uriData);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata.image),
    avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/task/${item.owner}`,
  };
  console.log('Task Item', { ret, item });
  return ret;
};

// Game Participant
export const gamePartCardContent = (item: any) => {
  let metadata = hexStringToJson(item.entity.metadata);
  let ret = {
    id: item.entity.id,
    imgSrc: resolveLink(metadata.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/game/${item.entity.id}`,
  };
  // console.log('[DEV] daoPartCardContent() item', { item, ret });
  return ret;
};
