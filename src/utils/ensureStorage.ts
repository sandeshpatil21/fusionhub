import fs from 'fs';
import { getPaths } from './storage';

export const ensureStorageDirectories = () => {
  const paths = getPaths();
  
  // Create all required directories if they don't exist
  Object.values(paths).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}; 