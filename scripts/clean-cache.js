import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache');

if (fs.existsSync(cacheDir)) {
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('✔ node_modules/.cache has been cleared.');
  } catch (err) {
    console.error('✘ Error cleaning cache:', err.message);
  }
}
