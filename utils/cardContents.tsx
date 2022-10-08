import { PersonOutlineOutlined } from '@mui/icons-material';
import {
  addressToShortAddress,
  hexStringToJson,
  soulToFirstLastNameString,
} from './converters';
import { resolveLink } from './metadata';

// Item Processing Function
export const gameCardContent = (item: any) => {
  let metadata = hexStringToJson(item.uriData);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata: metadata,
    link: `/game/${item.owner}`,
  };
  return ret;
};

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
