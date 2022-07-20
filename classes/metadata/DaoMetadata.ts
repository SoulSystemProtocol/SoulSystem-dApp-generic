/**
 * Class for metadata of DAO.
 */
export default class DaoMetadata {
  image: string;
  description: string;

  constructor(image: string, description: string) {
    this.image = image;
    this.description = description;
  }
}
