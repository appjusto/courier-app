/* eslint-env node */

const { spawn } = require('child_process');
const { version } = require('../version.json');
const { ENV, PLATFORM, PROFILE, REMOTE } = process.env;

// Usage:
// devclient
// ENV=dev PROFILE=devclient PLATFORM=ios npm run build
// ENV=dev PROFILE=devclient npm run build
// device
// ENV=dev PLATFORM=ios PROFILE=store npm run build
// ENV=dev npm run build
// store
// ENV=live PROFILE=closed REMOTE=true npm run build
// ENV=live PROFILE=production REMOTE=true npm run build

const run = async () => {
  if (!ENV) {
    console.error('ENV indefinido');
    process.exit(-1);
  }
  const majorVersion = `v${version.slice(0, version.indexOf('.'))}`;
  const platform = PLATFORM ?? 'android';
  const profile = majorVersion + '-' + (PROFILE ?? 'internal');
  const args = [
    '-f',
    `.env.${ENV}.local`,
    'eas',
    'build',
    '--profile',
    profile,
    '--platform',
    platform,
    ...(REMOTE === 'true' ? [] : ['--clear-cache', '--local']),
  ];
  console.log(`Criando build ${profile} para ${platform} no ambiente ${ENV}: eas`, args.join(' '));
  spawn('env-cmd', args, { stdio: 'inherit' });
};

run()
  .then(() => null)
  .catch(console.error);
