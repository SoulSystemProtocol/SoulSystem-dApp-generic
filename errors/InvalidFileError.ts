export default class InvalidFileError extends Error {
  constructor() {
    super(
      'Sorry, Only JPG/PNG/GIF files with size smaller than 2MB are currently supported',
    );
    this.name = 'InvalidFileError';
  }
}
