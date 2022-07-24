/**
 * Class for task.
 */
export default class Task {
  id: string;
  name: string;
  uri: string | null;
  uriData: any;
  game: any;
  roles: any;
  nominations: any;
  posts: any;

  constructor(
    id: string,
    name: string,
    uri: string | null,
    uriData: any,
    game: any,
    roles: any,
    nominations: any,
    posts: any,
  ) {
    this.id = id;
    this.name = name;
    this.uri = uri;
    this.uriData = uriData;
    this.game = game;
    this.roles = roles;
    this.nominations = nominations;
    this.posts = posts;
  }
}
