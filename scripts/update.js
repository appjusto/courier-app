/* eslint-env node */
const { spawn } = require('child_process');
const { version } = require('../version.json');
const { ENV, CHANNEL } = process.env;

// Usage:
// ENV=dev npm run update
// ENV=live CHANNEL=internal npm run update
// ENV=live CHANNEL=closed npm run update
// ENV=live CHANNEL=production npm run update

const run = async () => {
  if (!ENV) {
    console.error('ENV indefinido');
    process.exit(-1);
  }
  let channel = `v${version.slice(0, version.indexOf('.'))}`;
  if (CHANNEL) channel = `${channel}-${CHANNEL}`;
  const args = ['-f', `.env.${ENV}.local`, 'eas', 'update', '--channel', channel, '--auto'];
  console.log(`Atualizando ${channel} no ambiente ${ENV}: eas`, args.join(' '));
  spawn('env-cmd', args, { stdio: 'inherit' });
};

run()
  .then(() => null)
  .catch(console.error);
