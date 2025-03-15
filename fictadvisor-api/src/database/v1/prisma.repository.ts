import { Prisma, PrismaClient } from '@prisma/client/cohorta';
import { BasePrismaRepository } from '../base-prisma.repository';
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

export class PrismaRepository<
  Model extends TModels<Prisma.TypeMap>,
  Dto,
  WhereType = TWhere<Prisma.TypeMap, Model>,
  SortType = TSort<Prisma.TypeMap, Model>,
  IncludeType = TInclude<Prisma.TypeMap, Model>,
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
