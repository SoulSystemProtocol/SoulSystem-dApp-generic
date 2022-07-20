/**
 * Class for metadata of soul.
 */
export default class SoulMetadata {
  image: string;
  attributes: Array<any>;

  constructor(image: string, attributes: Array<any>) {
    this.image = image;
    this.attributes = attributes;
  }
}
