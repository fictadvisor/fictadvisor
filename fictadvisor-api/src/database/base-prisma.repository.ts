import { RepositoryInterface } from './interfaces/repository.interface';
import { nonEmptyObject } from '../common/utils/object.utils';
import {
  TCreate,
  TInclude,
  TModels,
  TypeMap,
  TUpdate,
  TSort,
  TWhere,
  TWhereUnique,
  TBatchPayload,
  PrismaClientWithModels,
} from './types/repository.types';

export abstract class BasePrismaRepository<
  TTypeMap extends TypeMap,
  TPrismaClient extends PrismaClientWithModels,
  Model extends TModels<TTypeMap>,
  Dto,
  WhereType = TWhere<TTypeMap, Model>,
  SortType = TSort<TTypeMap, Model>,
  IncludeType = TInclude<TTypeMap, Model>,
  CreateType = TCreate<TTypeMap, Model>,
  UpdateType = TUpdate<TTypeMap, Model>,
  WhereUniqueType = TWhereUnique<TTypeMap, Model>,
  BatchPayloadType = TBatchPayload<TTypeMap, Model>
> implements RepositoryInterface<Dto, WhereType, SortType, IncludeType> {
  protected constructor (
    readonly model: TPrismaClient[Model],
    readonly repositoryInclude?: IncludeType
  ) {}

  protected resolveInclude (include?: IncludeType): IncludeType | undefined {
    return nonEmptyObject({
      ...this.repositoryInclude,
      ...include,
    } as object) as IncludeType | undefined;
  }

  async findMany (
    where: WhereType,
    include?: IncludeType,
    page?: { take: number; skip: number },
    orderBy?: SortType
  ): Promise<Dto[]> {
    return (this.model as any).findMany({
      where,
      orderBy,
      take: page?.take,
      skip: page?.skip,
      include: this.resolveInclude(include),
    });
  }

  async findOne (where: WhereType, include?: IncludeType): Promise<Dto> {
    return (this.model as any).findFirst({
      where,
      include: this.resolveInclude(include),
    });
  }

  async create (data: CreateType, include?: IncludeType): Promise<Dto> {
    return (this.model as any).create({
      data,
      include: this.resolveInclude(include),
    });
  }

  async createMany (data: CreateType[]): Promise<BatchPayloadType> {
    return (this.model as any).createMany({ data });
  }

  async update (where: WhereType, data: UpdateType): Promise<BatchPayloadType> {
    return (this.model as any).updateMany({
      where,
      data,
    });
  }

  async updateById (id: string, data: UpdateType, include?: IncludeType): Promise<Dto> {
    return (this.model as any).update({
      where: { id },
      data,
      include: this.resolveInclude(include),
    });
  }

  async delete (where: WhereType): Promise<BatchPayloadType> {
    return (this.model as any).deleteMany({ where });
  }

  async deleteById (id: string, include?: IncludeType): Promise<Dto> {
    return (this.model as any).delete({
      where: { id },
      include: this.resolveInclude(include),
    });
  }

  async count (where: WhereType): Promise<number> {
    return (this.model as any).count({ where });
  }

  async upsert (where: WhereUniqueType, create: CreateType, update: UpdateType): Promise<Dto[]> {
    return (this.model as any).upsert({
      where,
      update,
      create,
    });
  }
}
