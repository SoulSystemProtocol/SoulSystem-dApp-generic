// import { getTraitValue } from 'helpers/metadata';

/** DEPRECATE
 * Class for soul.
 */
export default class Soul {
  id: string;
  owner: string;
  type: string;
  uri: string | null;
  uriData: any | null;
  uriImage: string | null;
  uriFirstName: string | null;
  uriLastName: string | null;
  // posts: any | null;
  // getTraitValue: function;

  constructor(
    id: string,
    owner: string,
    type: string,
    uri: string | null,
    uriData: any | null,
    uriImage: string | null,
    uriFirstName: string | null,
    uriLastName: string | null,
    // posts: any | null,
  ) {
    this.id = id;
    this.owner = owner;
    this.type = type;
    this.uri = uri;
    this.uriData = uriData;
    this.uriImage = uriImage;
    this.uriFirstName = uriFirstName;
    this.uriLastName = uriLastName;
    // this.posts = posts;
  }

  //Get Trait Value by Key
  // getTraitValue(key: string) {
  //   return getTraitValue(this?.uriData?.attributes, key);
  // }
}
