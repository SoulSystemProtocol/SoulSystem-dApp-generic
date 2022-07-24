/**
 * Class for task.
 */
export default class Task {
  id: string;
  name: string;
  uri: string | null;
  uriData: any;
  game: any;
  nominations: any;

  constructor(
    id: string,
    name: string,
    uri: string | null,
    uriData: any,
    game: any,
    nominations: any,
  ) {
    this.id = id;
    this.name = name;
    this.uri = uri;
    this.uriData = uriData;
    this.game = game;
    this.nominations = nominations;
  }
}
