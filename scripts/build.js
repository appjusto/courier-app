/* eslint-env node */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { version } = require('../version.json');
const eas = require('../eas.json');
const { ENV, PLATFORM, CHANNEL, PROFILE } = process.env;

// Usage:
// devclient
// ENV=dev PROFILE=devclient PLATFORM=ios npm run build
// ENV=dev PROFILE=devclient npm run build
// device
// ENV=dev PLATFORM=ios PROFILE=store npm run build
// ENV=dev npm run build
// others
// ENV=dev CHANNEL=v14 npm run build
// ENV=live PROFILE=store npm run build

const run = async () => {
  if (!ENV) {
    console.error('ENV indefinido');
    process.exit(-1);
  }
  const platform = PLATFORM ?? 'android';
  const profile = PROFILE ?? 'internal';
  const channel = CHANNEL ?? `v${version.slice(0, version.indexOf('.'))}`;
  if (eas.build.base.channel !== channel) {
    const easCopy = { ...eas };
    easCopy.build.base.channel = channel;
    console.log(`Atualizando channel para ${channel}...`);
    fs.writeFileSync(
      path.join(__dirname, '..', 'eas.json'),
      JSON.stringify(easCopy, undefined, '  ')
    );
  }
  const args = [
    '-f',
    `.env.${ENV}.local`,
    'eas',
    'build',
    '--profile',
    profile,
    '--platform',
    platform,
  ];
  console.log(`Criando build ${profile} para ${platform} no ambiente ${ENV}: eas`, args.join(' '));
  spawn('env-cmd', args, { stdio: 'inherit' });
};

run()
  .then(() => null)
  .catch(console.error);
