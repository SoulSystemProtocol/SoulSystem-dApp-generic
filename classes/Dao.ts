/**
 * Class for DAO.
 */
export default class Dao {
  id: string;
  name: string;
  type: string | null;
  uri: string | null;
  uriData: any | null;
  roles: any | null;

  constructor(
    id: string,
    name: string,
    type: string | null,
    uri: string | null,
    uriData: any | null,
    roles: any | null,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.uri = uri;
    this.uriData = uriData;
    this.roles = roles;
  }
}
