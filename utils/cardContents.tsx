import { WorkOutlineOutlined } from '@mui/icons-material';
import { resolveLink } from 'helpers/IPFS';
import TaskSoulCardDetails from 'components/entity/task/TaskSoulCardDetails';
import PersonIcon from '@mui/icons-material/Person';
import { normalizeGraphEntity } from 'helpers/metadata';
import { SxProps } from '@mui/material';
import { addressToShortAddress, hexStringToJson } from 'utils/converters';
import { soulDescription, soulImage, soulLink, soulName } from 'utils/soul';

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
    link: soulLink(item),
    roles,
  };
  return ret;
};

/// Game Card Processing
export const gameCardContent = (item: any): CardItem => {
  const metadata = hexStringToJson(item.metadata);
  const ret = {
    id: item.id,
    imgSrc: resolveLink(metadata?.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: soulLink(item),
    avatarIcon: <WorkOutlineOutlined />,
  };
  return ret;
};

/// Process Soul
export const processCardContent = (soul: any): CardItem => {
  const metadata = hexStringToJson(soul?.metadata);
  const ret = {
    id: soul.id,
    imgSrc: 'PARENT_IMAGE',
    component: 'GridCardTask',
    // avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: soulLink(soul),
    children: soul && <TaskSoulCardDetails address={soul.owner} />,
  };
  return ret;
};

// Relation to Container Soul
export const containedProcContent = (relation: any): CardItem => {
  const soul = relation?.aEnd;
  const metadata = hexStringToJson(soul?.metadata);
  const ret = {
    id: soul?.id,
    imgSrc: 'PARENT_IMAGE',
    component: 'GridCardTask',
    avatarIcon: <WorkOutlineOutlined />,
    label: metadata?.description,
    title: metadata?.name,
    metadata,
    link: soulLink(soul),
    children: soul && <TaskSoulCardDetails address={soul?.owner} />,
    linkSX: { display: { xs: 'none', md: 'block' } },
  };
  return ret;
};

/// Soul Part
export const soulPartCardContent = (item: any): CardItem => {
  const metadata = hexStringToJson(item.ent.metadata);
  // console.log('Part Item:', { item, metadata, ent: item.ent });
  const ret = {
    id: item.ent?.id,
    imgSrc: resolveLink(metadata?.image),
    title: soulName({ ...item.ent, metadata }),
    label: soulDescription({ ...item.ent, metadata }),
    metadata,
    link: soulLink(item.ent),
    roles: item?.roles,
  };
  return ret;
};

/// Game Participant
export const gamePartCardContent = (item: any): CardItem => {
  const metadata = hexStringToJson(item.entity.metadata);
  const ret = {
    id: item.entity.id,
    imgSrc: resolveLink(metadata?.image),
    title: soulName({ ...item.entity, metadata }),
    label: soulDescription({ ...item.entity, metadata }),
    metadata,
    link: soulLink(item.entity),
    roles: item?.roles,
  };
  return ret;
};

/// Soul Part for Tasks (Using Parent's Image)
export const soulPartTaskCardContent = (item: any): CardItem => {
  const metadata = hexStringToJson(item.ent.metadata);
  const ret = {
    id: item.ent.id,
    imgSrc: 'PARENT_IMAGE',
    component: 'GridCardTask',
    title: soulName({ ...item.ent, metadata }),
    label: soulDescription({ ...item.ent, metadata }),
    metadata,
    link: soulLink(item.ent),
    roles: item?.roles,
    // children: item && <StageDisplay proc={item.ent} />,
  };
  return ret;
};
