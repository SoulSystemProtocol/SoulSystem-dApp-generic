/**
 * Class for task.
 */
export default class Task {
  id: string;
  name: string;
  uri: string | null;
  uriData: any | null;
  game: any;
  constructor(
    id: string,
    name: string,
    uri: string | null,
    uriData: any | null,
    game: any | null,
  ) {
    this.id = id;
    this.name = name;
    this.uri = uri;
    this.uriData = uriData;
    this.game = game;
  }
}
