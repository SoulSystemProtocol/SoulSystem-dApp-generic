/**
 * Class for DAO.
 */
export default class Dao {
  id: string;
  name: string;
  type: string | null;
  roles: any | null;
  nominations: any | null;
  posts: any | null;

  constructor(
    id: string,
    name: string,
    type: string | null,
    roles: any | null,
    nominations: any | null,
    posts: any | null,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.roles = roles;
    this.nominations = nominations;
    this.posts = posts;
  }
}
