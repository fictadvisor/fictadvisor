import { parseArgs } from 'node:util';
import FictadvisorSeed from './fictadvisor/seed';
import CohortaSeed from './cohorta/seed';

const options: { project: { type: 'string' } } = {
  project: { type: 'string' },
};

async function main () {
  const {
    values: { project },
  } = parseArgs({ options });

  switch (project) {
    case 'cohorta':
      await CohortaSeed();
      break;
    case 'fictadvisor':
    default:
      await FictadvisorSeed();
  }
}

main();

