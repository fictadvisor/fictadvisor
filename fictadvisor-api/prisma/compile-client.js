'use strict';

// Prisma 7's `prisma-client` generator emits TypeScript source instead of a
// prebuilt JS client. The rest of the codebase imports `@prisma-client/<name>`
// as a normal runtime package (`node dist/src/main`, ts-jest, ts-node seeds),
// so we compile the generated TS to JS in place and drop a package.json that
// points `main` at the compiled entry. This keeps the existing import paths and
// CommonJS runtime working without any path-mapping changes.
//
// Usage: node prisma/compile-client.js <fictadvisor|cohorta>

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const name = process.argv[2];
if (!name) {
  console.error('Usage: node prisma/compile-client.js <client-name>');
  process.exit(1);
}

const clientDir = path.resolve(__dirname, '../../node_modules/@prisma-client', name);
if (!fs.existsSync(clientDir)) {
  console.error(`Generated client not found at ${clientDir}. Run prisma generate first.`);
  process.exit(1);
}

const tsconfigPath = path.join(clientDir, 'tsconfig.gen.json');
fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(
    {
      compilerOptions: {
        module: 'commonjs',
        target: 'ES2021',
        moduleResolution: 'node',
        ignoreDeprecations: '6.0',
        esModuleInterop: true,
        skipLibCheck: true,
        declaration: false,
        sourceMap: false,
        noEmitOnError: false,
        strict: false,
      },
      include: ['**/*.ts'],
      exclude: ['node_modules'],
    },
    null,
    2,
  ),
);

console.log(`Compiling @prisma-client/${name} ...`);
execFileSync('npx', ['tsc', '-p', tsconfigPath], {
  cwd: clientDir,
  stdio: 'inherit',
});

const pkgPath = path.join(clientDir, 'package.json');
fs.writeFileSync(
  pkgPath,
  JSON.stringify(
    {
      name: `@prisma-client/${name}`,
      version: '0.0.0',
      private: true,
      main: 'client.js',
      types: 'client.ts',
      sideEffects: false,
    },
    null,
    2,
  ),
);

console.log(`Compiled @prisma-client/${name} -> ${clientDir}`);
