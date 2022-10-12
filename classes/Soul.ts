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

}
