/* eslint-env node */

const { spawn } = require('child_process');
const { version } = require('../version.json');
const { ENV, PLATFORM, PROFILE, REMOTE } = process.env;

// Usage:
// devclient
// ENV=dev PROFILE=debug REMOTE=true npm run build
// ENV=dev PROFILE=devclient PLATFORM=ios REMOTE=true npm run build
// adhoc
// ENV=dev PROFILE=adhoc REMOTE=true npm run build
// ENV=dev PLATFORM=ios PROFILE=testflight REMOTE=true npm run build
// internal
// ENV=live PROFILE=internal REMOTE=true npm run build
// beta
// ENV=live PROFILE=closed REMOTE=true npm run build
// production
// ENV=live PROFILE=production REMOTE=true npm run build
// ENV=live PLATFORM=ios PROFILE=production REMOTE=true npm run build

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
