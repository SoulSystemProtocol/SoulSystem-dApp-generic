import { findIndex, isEmpty } from 'lodash';
import { soulName } from 'utils/soul';
import { MetadataAttribute } from './metadata';

/**
 * General Helper Functions
 */
export const MetaAttrHelper: any = {
  /**
   * Sort by display_type
   */
  sort: (attributes: MetadataAttribute[]) =>
    attributes.sort((a: any, b: any) => a?.display_type - b?.display_type),

  /**
   * Fetch the index of the current attribute in the array
   */
  getIndex: (
    attributes: MetadataAttribute[] = [],
    trait_type: string,
    display_type?: string,
  ): number => {
    if (isEmpty(attributes) || !trait_type) return -1;
    //Match, Case Insensitive
    return findIndex(
      attributes,
      (term) =>
        term?.trait_type?.toLowerCase() == trait_type.toLowerCase() &&
        term?.display_type == display_type,
    );
  },

  /**
   * Set the value of an attribute
   */
  attributeSet: (
    attributes: MetadataAttribute[],
    attr: MetadataAttribute,
  ): MetadataAttribute[] => {
    //Match, Case Insensitive
    let index = MetaAttrHelper.getIndex(attributes, attr.trait_type);
    if (index == -1) attributes.push(attr);
    else attributes[index] = attr;
    return attributes;
  },

  /**
   * Extract value (value) by name (trait_type)
   */
  extractValue(attributes: MetadataAttribute[], traitType: string): string {
    let index = MetaAttrHelper.getIndex(attributes, traitType);
    return index !== -1 ? attributes[index].value : '';
  },

  /**
   * Name extraction from attributes (Backward Compatible)
   */
  extractName(attributes: MetadataAttribute[]): string {
    let fauxSoul: any = {};
    fauxSoul.uriFirstName = MetaAttrHelper.extractValue(
      attributes,
      'last name',
    );
    fauxSoul.uriLastName = MetaAttrHelper.extractValue(
      attributes,
      'first name',
    );
    fauxSoul.name = MetaAttrHelper.extractValue(attributes, 'name');
    return soulName(fauxSoul);
  },

  /**
   * Remove an attribute from array by index
   */
  removeByIndex(
    index: number,
    attributes: MetadataAttribute[],
  ): MetadataAttribute[] {
    return attributes.filter((attr, i) => i !== index);
  },

  /**
   * Remove an attribute from array
   */
  removeItem(
    attributes: MetadataAttribute[],
    item: MetadataAttribute,
  ): MetadataAttribute[] {
    const index = MetaAttrHelper.getIndex(
      attributes,
      item.trait_type,
      item.display_type,
    );
    if (index !== -1) {
      return MetaAttrHelper.removeByIndex(index, attributes);
    }
    console.error('Attribute not found', item);
    return attributes;
  },
};
