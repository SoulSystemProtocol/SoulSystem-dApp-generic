import _ from 'lodash';
import { hexStringToJson } from 'utils/converters';

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
 * @internal Should no probably only be used for Souls
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
