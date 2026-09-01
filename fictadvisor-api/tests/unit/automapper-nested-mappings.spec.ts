import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { getMetadataList } from '@automapper/classes';

/**
 * Automapper resolves a nested member through the exact class its `@AutoMap`
 * declares, so an entity that exposes a narrow shape (`DbBaseGroup`) needs its
 * own registered map — the one on the rich class does not apply. Missing pairs
 * only surface at request time, as a 500 from the endpoint that maps them.
 */

const root = path.resolve(__dirname, '../..');

const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const files = walk(path.join(root, 'src'));

const registry = new Map<string, any>();
const collect = (mod: object) => {
  for (const [name, value] of Object.entries(mod)) {
    if (typeof value === 'function' && !registry.has(name)) registry.set(name, value);
  }
};
// the modules are discovered at runtime, so they cannot be imported statically
/* eslint-disable @typescript-eslint/no-require-imports */
collect(require('@fictadvisor/utils/responses'));
for (const file of files) {
  if (/\.(entity|data)\.ts$/.test(file)) collect(require(file));
}
/* eslint-enable @typescript-eslint/no-require-imports */

const registered = new Set<string>();
const overridden = new Map<string, Set<string>>();

for (const file of files.filter((f) => f.endsWith('.profile.ts'))) {
  const source = fs.readFileSync(file, 'utf8');

  for (const match of source.matchAll(/mapWith\(\s*(\w+)\s*,\s*(\w+)\s*,/g)) {
    registered.add(`${match[2]}->${match[1]}`);
  }

  for (const match of source.matchAll(/createMap\(\s*mapper\s*,\s*(\w+)\s*,\s*(\w+)/g)) {
    const pair = `${match[1]}->${match[2]}`;
    registered.add(pair);

    // the arguments of this createMap call, so forMember overrides can be read
    let depth = 0;
    const open = source.indexOf('(', match.index!);
    let close = open;
    for (let i = open; i < source.length; i++) {
      if (source[i] === '(') depth++;
      else if (source[i] === ')' && --depth === 0) {
        close = i; break; 
      }
    }
    const call = source.slice(open, close);
    const keys = new Set<string>();
    for (const m of call.matchAll(/=>\s*\w+\.(\w+)\s*,/g)) keys.add(m[1]);
    for (const m of call.matchAll(/forMembers<[^>]*>\(\s*\{([\s\S]*?)\}\s*\)/g)) {
      for (const k of m[1].matchAll(/^\s*(\w+)\s*:/gm)) keys.add(k[1]);
    }
    overridden.set(pair, keys);
  }
}

const membersOf = (model: any): [string, any][] => {
  try {
    return (getMetadataList(model)[0] ?? []) as [string, any][];
  } catch {
    return [];
  }
};
const typeOf = (member: any) => {
  try {
    return member.type();
  } catch {
    return undefined;
  }
};
const isModel = (type: any) => typeof type === 'function' && membersOf(type).length > 0;

describe('automapper profiles', () => {
  it('registers a mapping for every nested member they map', () => {
    const missing: string[] = [];

    for (const pair of registered) {
      const [sourceName, destinationName] = pair.split('->');
      const source = registry.get(sourceName);
      const destination = registry.get(destinationName);
      if (!source || !destination) continue;

      const destinationMembers = new Map(membersOf(destination));

      for (const [key, sourceMember] of membersOf(source)) {
        if (overridden.get(pair)?.has(key)) continue;

        const destinationMember = destinationMembers.get(key);
        if (!destinationMember) continue;

        const from = typeOf(sourceMember);
        const to = typeOf(destinationMember);
        if (!isModel(from) || !isModel(to)) continue;

        if (!registered.has(`${from.name}->${to.name}`)) {
          missing.push(`${from.name} -> ${to.name}   (needed by ${sourceName}.${key} -> ${destinationName})`);
        }
      }
    }

    expect([...new Set(missing)].sort()).toEqual([]);
  });
});
