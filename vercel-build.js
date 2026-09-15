import { execSync } from 'child_process';
import fs from 'fs';

try {
  if (fs.existsSync('frontend/package.json')) {
    // Running from repository root
    console.log('[Vercel Build] Running from repository root...');
    execSync('npm --prefix frontend install', { stdio: 'inherit' });
    execSync('npm --prefix frontend run build', { stdio: 'inherit' });

    if (fs.existsSync('frontend/dist')) {
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
      }
      fs.cpSync('frontend/dist', 'dist', { recursive: true });
      console.log('[Vercel Build] Synced frontend/dist to root dist.');
    }
  } else if (fs.existsSync('src')) {
    // Running from inside frontend directory
    console.log('[Vercel Build] Running from inside frontend directory...');
    execSync('npm run build', { stdio: 'inherit' });
  } else {
    console.log('[Vercel Build] Standard build fallback...');
    execSync('npm run build', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('[Vercel Build Error]', error);
  process.exit(1);
}
