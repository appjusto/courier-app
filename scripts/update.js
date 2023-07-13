const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { version } = require('../version.json');
const eas = require('../eas.json');
const { ENV, CHANNEL } = process.env;

// Usage:
// ENV=dev npm run update
// ENV=dev CHANNEL=v14 npm run update

const run = async () => {
  if (!ENV) {
    console.error('ENV indefinido');
    process.exit(-1);
  }
  const channel = CHANNEL ?? `v${version.slice(0, version.indexOf('.'))}`;
  const args = [
    '-f',
    `.env.${ENV}.local`,
    'eas',
    'update',
    '--channel',
    channel,
  ];
  console.log(`Atualizando ${channel} no ambiente ${ENV}: eas`, args.join(' '));
  spawn('env-cmd', args, { stdio: 'inherit' });
};

run()
  .then(() => null)
  .catch(console.error);
