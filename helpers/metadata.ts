import { EditAttributesOutlined } from '@mui/icons-material';
import _ from 'lodash';

/**
 * Get a trait value from metadata attributes.
 */
export function getAttribute(
  attributes: Array<object> | null,
  traitType: string,
): string {
  const attribute: any = attributes?.find(
    (attribute: any) => attribute?.trait_type === traitType,
  );
  return attribute?.value || '';
}

//Get Trait Value by Key
export const getMetadataTraitValue = (metadata: any, key: string) => {
  return getAttribute(metadata?.attributes, key);
};

/**
 * Set the value of an attribute
 */
export const attributeSet = (
  attributes: any[],
  key: string,
  value: { [key: string]: any },
) => {
  let index = _.findIndex(attributes, { trait_type: key });
  if (index == -1) {
    //Add
    attributes.push(value);
  } else {
    //Update
    attributes[index] = value;
  }
  return attributes;
};
