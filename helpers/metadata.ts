import { PROFILE_TRAIT_TYPE } from 'constants/metadata';
import _ from 'lodash';
import { hexStringToJson, nameSoul } from 'utils/converters';
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
  if (!subgraphEntity?.metadata)
    console.error(
      subgraphEntity.role + ' Entity missing Metadata',
      subgraphEntity,
    );
  return subgraphEntity
    ? {
        ...subgraphEntity,
        metadata: hexStringToJson(subgraphEntity?.metadata),
      }
    : null;
};

/**
 * Prep Metadata
 */
export const prepMetadata = (metadata: any): any => {
  let uriFirstName = MetaAttrHelper.extractValue(
    metadata?.attributes,
    PROFILE_TRAIT_TYPE.firstName,
  );
  let uriLastName = MetaAttrHelper.extractValue(
    metadata?.attributes,
    PROFILE_TRAIT_TYPE.lastName,
  );
  metadata.name = nameSoul({ uriFirstName, uriLastName });
  metadata.description = MetaAttrHelper.extractValue(
    metadata?.attributes,
    'Description',
  );
  return metadata;
}

/**
 * Update a Soul Entity on metadata update
 */
export const updateSoul = (soul: any, metadata: any) => {
  console.warn('Running updateSoul', { soul, metadata });
  // if (!soul) return soul;
  if (!soul) soul = {name: 'Unknown'};
  soul.metadata = metadata;
  soul.name = metadata?.name;
  soul.uriImage = metadata?.image;
  return soul;
}