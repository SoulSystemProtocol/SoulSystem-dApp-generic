import _ from 'lodash';
import { hexStringToJson } from 'utils/converters';
import { MetaAttrHelper } from './MetaAttrHelper';

export type MetadataAttributeType =
  | 'date'
  | 'boost_number'
  | 'boost_percentage'
  | 'number';

export interface MetadataAttribute {
  trait_type: string;
  value: any;
  display_type?: MetadataAttributeType;
}

/**
 * Normalize graph entity before use
 */
export const normalizeGraphEntity = (subgraphEntity: any): any => {
  //Validations
  if (!subgraphEntity) return null;
  // if (!subgraphEntity?.metadata)
  //   console.warn(
  //     subgraphEntity.role + ' Entity missing Metadata',
  //     subgraphEntity,
  //   );
  return !subgraphEntity
    ? null
    : typeof subgraphEntity?.metadata == 'string' 
    ? {
        ...subgraphEntity,
        metadata: hexStringToJson(subgraphEntity?.metadata),
      }
    : subgraphEntity;
};

/**
 * Update a Soul Entity on metadata update
 */
export const updateSoul = (soul: any, metadata: any) => {
  // if (!soul) return soul;
  if (!soul) soul = { name: 'Unknown' };
  soul.metadata = metadata;
  soul.name = metadata?.name;
  soul.uriImage = metadata?.image;
  return soul;
};
