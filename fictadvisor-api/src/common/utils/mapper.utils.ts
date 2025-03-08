import { forMember, mapFrom, MappingConfiguration } from '@automapper/core';
const AUTOMAPPER = 'nestjs__AUTO_MAPPER__';

type MappingConfig<TSource, TDest> = {
  [K in keyof TDest]?: (source: TSource) => TDest[K]
};

export function forMembers<TSource, TDest> (
  config: MappingConfig<TSource, TDest>
): MappingConfiguration<TSource, TDest>[] {
  return (Object.keys(config) as Array<keyof TDest>).map((key) =>
    forMember(
      (dest: TDest) => dest[key],
      mapFrom((src: TSource) => config[key]?.(src))
    )
  );
}

export const getMapperToken = (name?: string) =>
  name ? AUTOMAPPER + name : AUTOMAPPER + 'default';
