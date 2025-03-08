import { Prisma, PrismaClient } from '@prisma/client/fictadvisor';
import { BasePrismaRepository } from '../prisma.repository';
import {
  TModels,
  TWhere,
  TSort,
  TInclude,
  TCreate,
  TUpdate,
  TWhereUnique,
  TBatchPayload,
} from '../types/repository.types';

export type Models = TModels<Prisma.TypeMap>
export type Where<Model extends Models> = TWhere<Prisma.TypeMap, Model>
export type Sort<Model extends Models> = TSort<Prisma.TypeMap, Model>
export type Include<Model extends Models> = TInclude<Prisma.TypeMap, Model>

export class PrismaRepository<
  Model extends Models,
  Dto,
  WhereType = Where<Model>,
  SortType = Sort<Model>,
  IncludeType = Include<Model>,
  CreateType = TCreate<Prisma.TypeMap, Model>,
  UpdateType = TUpdate<Prisma.TypeMap, Model>,
  WhereUniqueType = TWhereUnique<Prisma.TypeMap, Model>,
  BatchPayloadType = TBatchPayload<Prisma.TypeMap, Model>
> extends BasePrismaRepository<
  Prisma.TypeMap,
  PrismaClient,
  Model,
  Dto,
  WhereType,
  SortType,
  IncludeType,
  CreateType,
  UpdateType,
  WhereUniqueType,
  BatchPayloadType
> {
  constructor (
    model: PrismaClient[Model],
    repositoryInclude?: IncludeType
  ) {
    super(model, repositoryInclude);
  }
}
