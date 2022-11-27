/**
 * Class for project.
 */
export default class Project {
  id: string;
  name: string;
  type: string | null;
  roles: any | null;
  posts: any | null;

  constructor(
    id: string,
    name: string,
    type: string | null,
    roles: any | null,
    posts: any | null,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.roles = roles;
    this.posts = posts;
  }
}
