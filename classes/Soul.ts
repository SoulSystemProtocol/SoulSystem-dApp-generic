/**
 * Class for soul.
 */
export default class Soul {
  id: string;
  owner: string;
  uri: string | null;
  uriData: any | null;
  uriImage: string | null;
  uriFirstName: string | null;
  uriLastName: string | null;

  constructor(
    id: string,
    owner: string,
    uri: string | null,
    uriData: any | null,
    uriImage: string | null,
    uriFirstName: string | null,
    uriLastName: string | null
  ) {
    this.id = id;
    this.owner = owner;
    this.uri = uri;
    this.uriData = uriData;
    this.uriImage = uriImage;
    this.uriFirstName = uriFirstName;
    this.uriLastName = uriLastName;
  }
}
