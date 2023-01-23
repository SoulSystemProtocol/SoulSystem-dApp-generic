import { WorkOutlineOutlined } from '@mui/icons-material';
import { resolveLink } from 'helpers/IPFS';
import TaskSoulCardDetails from 'components/entity/task/TaskSoulCardDetails';
import PersonIcon from '@mui/icons-material/Person';
import { normalizeGraphEntity } from 'helpers/metadata';
import { SxProps } from '@mui/material';
import StageDisplay from 'components/entity/task/StageDisplay';
import { addressToShortAddress, hexStringToJson } from 'utils/converters';
import { soulImage, soulName } from 'utils/soul';

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
  linkSX?: SxProps;
  entity?: any;
  component?: string;
}

/**
 * Card Item Processing Functions
 */

/// Soul
export const soulCardContent = (item: any, roles?: any[]): CardItem => {
  let ret = soulCardProcessedContent(normalizeGraphEntity(item));
  ret.component = 'GridCardUser';
  return ret;
};

/// Soul Card with Item that has Already Been Processed
export const soulCardProcessedContent = (
  item: any,
  roles?: any[],
): CardItem => {
  const ret = {
    entity: item,
    id: item.id,
    imgSrc: soulImage(item),
    avatarIcon: <PersonIcon sx={{ fontSize: 50 }} />,
    label: addressToShortAddress(item.owner),
    title: soulName(item),
    link: `/soul/${item.id}`,
    roles,
  };
  return ret;
};

/// Game Card Processing
export const gameCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.metadata);
  const ret = {
    id: item.id,
    imgSrc: resolveLink(metadata?.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${item.owner}`,
    avatarIcon: <WorkOutlineOutlined />,
  };
  return ret;
};

/// Process Soul
export const processCardContent = (soul: any): CardItem => {
  let metadata = hexStringToJson(soul?.metadata);
  const ret = {
    id: soul.id,
    imgSrc: 'PARENT_IMAGE',
    component: 'GridCardTask',
    // avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${soul.owner}`,
    children: soul && <TaskSoulCardDetails address={soul.owner} />,
  };
  return ret;
};

// Relation to Container Soul
export const containedProcContent = (relation: any): CardItem => {
  const soul = relation?.aEnd;
  let metadata = hexStringToJson(soul?.metadata);
  const ret = {
    id: soul?.id,
    imgSrc: 'PARENT_IMAGE',
    component: 'GridCardTask',
    avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${soul?.owner}`,
    children: soul && <TaskSoulCardDetails address={soul?.owner} />,
    linkSX: { display: { xs: 'none', md: 'block' } },
  };
  return ret;
};

// Soul Part
export const soulPartCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.aEnd.metadata);
  const ret = {
    id: item.aEnd.id,
    imgSrc: resolveLink(metadata?.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${item.aEnd.owner}`,
    roles: item?.roles,
  };
  return ret;
};

// Game Participant
export const gamePartCardContent = (item: any): CardItem => {
  let metadata = hexStringToJson(item.entity.metadata);
  const ret = {
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
  const ret = {
    id: item.aEnd.id,
    imgSrc: 'PARENT_IMAGE',
    component: 'GridCardTask',
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: `/soul/${item.aEnd.owner}`,
    roles: item?.roles,
    // children: item && <StageDisplay proc={item.aEnd} />,
  };
  return ret;
};
