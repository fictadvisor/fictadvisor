import * as process from 'node:process';

// The label error reports carry. NODE_ENV cannot be it: the API image sets
// NODE_ENV=production for both the master and the dev deployment (it also picks
// the .env file and library behaviour), so every alert from dev said PRODUCTION.
// DEPLOY_ENV is baked into the image per branch at build time.
export function deployEnvLabel (): string | undefined {
  return (process.env.DEPLOY_ENV || process.env.NODE_ENV)?.toUpperCase();
}
