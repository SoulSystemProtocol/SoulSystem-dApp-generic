/**
 * Class for metadata of project.
 */
export default class ProjectMetadata {
  image: string;
  description: string;

  constructor(image: string, description: string) {
    this.image = image;
    this.description = description;
  }
}
