import {
  PersonOutlineOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  addressToShortAddress,
  hexStringToJson,
  soulToFirstLastNameString,
} from './converters';
import { resolveLink } from 'helpers/IPFS';

export interface CardItem {
  id: string;
  title: string;
  label: string;
  link: string;
  imgSrc: string;
  roles?: any[];
  avatarIcon?: any;
}

// Item Processing Function
export const soulCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.metadata);

  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata?.image),
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
export const gameCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.metadata);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata?.image),
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
export const processCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.metadata);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata?.image),
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
export const gamePartCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.entity.metadata);
  // console.log('Game Participant', { metadata, item });
  let ret = {
    id: item.entity.id,
    imgSrc: resolveLink(metadata?.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/game/${item.entity.id}`,
    roles: item?.roles,
  };
  return ret;
};

// Soul Part
export const soulPartCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.aEnd.metadata);
  let ret = {
    id: item.aEnd.id,
    imgSrc: resolveLink(metadata?.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/game/${item.aEnd.owner}`,
    roles: item?.roles,
  };
  // console.log('soulPartCardContent() Soul Part', { metadata, item, ret });
  return ret;
};

// Task Participant
export const taskPartCardContent = (item: any): CardItem => {
  let gameMetadata = hexStringToJson(item.entity.game.metadata);
  let metadata = hexStringToJson(item.entity.metadata);
  let ret = {
    id: item.entity.id,
    imgSrc: resolveLink(gameMetadata.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/tasks/${item.entity.id}`,
    roles: item?.roles,
  };
  return ret;
};
