import fs from 'fs';
import path from 'path';

const src = path.resolve('frontend', 'dist');
const dest = path.resolve('dist');

try {
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log('[Vercel Build] Successfully copied frontend/dist to root dist directory.');
  } else {
    console.error('[Vercel Build] Error: frontend/dist does not exist.');
    process.exit(1);
  }
} catch (error) {
  console.error('[Vercel Build] Error copying dist directory:', error);
  process.exit(1);
}
