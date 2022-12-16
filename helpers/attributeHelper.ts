import _ from 'lodash';
import { MetadataAttribute } from './metadata';

/**
 * General Helper Functions
 */
export const attributeHelper = {
  /**
   * Sort by display_type
   */
  sort: (attributes: MetadataAttribute[]) =>
    attributes.sort((a: any, b: any) => a?.display_type - b?.display_type),

  /**
   * Fetch the index of the current attribute in the array
   */
  getIndex: (attributes: MetadataAttribute[], trait_type: string) => {
    //Match, Case Insensitive
    return _.findIndex(
      attributes,
      (term) => term.trait_type.toLowerCase() == trait_type.toLowerCase(),
    );
  },

  /**
   * Set the value of an attribute
   */
  attributeSet: (attributes: MetadataAttribute[], attr: MetadataAttribute) => {
    //Match, Case Insensitive
    let index = attributeHelper.getIndex(attributes, attr.trait_type);
    if (index == -1) attributes.push(attr);
    else attributes[index] = attr;
    return attributes;
  },

  /**
   * Extract trait_value by trait_type (label)
   */
  extractValue(attributes: MetadataAttribute[], traitType: string): string {
    let index = attributeHelper.getIndex(attributes, traitType);
    return index !== -1 ? attributes[index].value : '';
  },

  /**
   * 
   */
  removeByIndex(
    index: number,
    attributes: MetadataAttribute[],
  ): MetadataAttribute[] {
    return attributes.filter((attr, i) => i !== index);
  },
};
