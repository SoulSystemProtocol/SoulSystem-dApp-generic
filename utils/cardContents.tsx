import { WorkOutlineOutlined } from '@mui/icons-material';
import {
  addressToShortAddress,
  hexStringToJson,
  soulToFirstLastNameString,
} from './converters';
import { resolveLink } from 'helpers/IPFS';
import TaskSoulCardDetails from 'components/entity/task/TaskSoulCardDetails';
import { normalizeGraphEntity } from 'helpers/metadata';

export interface CardItem {
  id: string;
  title: string;
  label: string;
  link: string;
  imgSrc: string;
  roles?: any[];
  avatarIcon?: any;
  baseRoute?: string;
  children?: any;
}

/**
 * Card Item Processing Functions
 */

/// Soul
export const soulCardContent = (item: any, roles?: any[]): CardItem => {
  return soulCardProcessedContent(normalizeGraphEntity(item));
};

/// Soul Card with Item that has Already Been Processed
export const soulCardProcessedContent = (
  item: any,
  roles?: any[],
): CardItem => {
  // console.warn('Start with item', item);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(item?.metadata?.image),
    // avatarIcon: <PersonOutlineOutlined />,
    label: addressToShortAddress(item.owner),
    title: soulToFirstLastNameString(item),
    link: `/soul/${item.id}`,
    roles,
  };
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
    link: `/soul/${item.owner}`,
    avatarIcon: <WorkOutlineOutlined />,
  };
  // ret.avatarIcon = (<WorkOutlineOutlined />);
  return ret;
};

// Process Soul
export const processCardContent = (soul: any): CardItem => {
  let metadata = hexStringToJson(soul.metadata);
  let ret = {
    id: soul.id,
    imgSrc: 'PARENT_IMAGE',
    avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${soul.owner}`,
    children: soul && <TaskSoulCardDetails address={soul.owner} />,
  };
  // console.log('Task soul', { ret, soul, owner: soul.owner });
  return ret;
};

// Relation to Container Soul
export const containedCardContent = (relation: any): CardItem => {
  const soul = relation?.aEnd;
  let metadata = hexStringToJson(soul?.metadata);
  let ret = {
    id: soul?.id,
    imgSrc: 'PARENT_IMAGE',
    avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${soul?.owner}`,
    children: soul && <TaskSoulCardDetails address={soul?.owner} />,
  };
  // console.log('Task soul', { ret, soul, owner: soul.owner });
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
    link: `/soul/${item.aEnd.owner}`,
    roles: item?.roles,
  };
  // console.log('soulPartCardContent() Soul Part', { metadata, item, ret });
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
    link: `/soul/${item.entity.id}`,
    roles: item?.roles,
  };
  return ret;
};

// Soul Part for Tasks (Using Parent's Image)
export const soulPartTaskCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.aEnd.metadata);
  let ret = {
    id: item.aEnd.id,
    imgSrc: 'PARENT_IMAGE',
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    // link: `/tasks/${item.aEnd.owner}`,
    link: `/soul/${item.aEnd.owner}`,
    roles: item?.roles,
  };
  // console.log('soulPartTaskCardContent() Soul Part', { metadata, item, ret });
  return ret;
};
