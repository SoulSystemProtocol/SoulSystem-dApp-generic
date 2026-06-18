import fs from 'fs';
import path from 'path';

describe('web manifest', () => {
  it('is available from Next public assets', () => {
    const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');

    expect(fs.existsSync(manifestPath)).toBe(true);
  });
});
