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
  BatchPayloadType = TBatchPayload<TTypeMap, Model>,
> implements RepositoryInterface<Dto, WhereType, SortType, IncludeType> {
  protected constructor (
    readonly model: TPrismaClient[Model],
    readonly repositoryInclude?: IncludeType,
  ) {}

  async findMany<T = Dto> (
    where: WhereType,
    include?: IncludeType,
    page?: { take: number; skip: number },
    orderBy?: SortType,
  ): Promise<T[]> {
    const methodInclude = {
      ...this.repositoryInclude,
      ...include,
    };

    return (this.model as any).findMany({
      where,
      orderBy,
      take: page?.take,
      skip: page?.skip,
      include: nonEmptyObject(methodInclude as object),
    });
  }

  async findOne<T = Dto> (where: WhereType, include?: IncludeType): Promise<T> {
    return (this.model as any).findFirst({
      where,
      include: include ?? this.repositoryInclude,
    });
  }

  async getUnique<T = Dto> (
    where: WhereUniqueType,
    include?: IncludeType,
  ): Promise<T> {
    return (this.model as any).findUnique({
      where,
      include: include ?? this.repositoryInclude,
    });
  }

  async create<T = Dto> (data: CreateType, include?: IncludeType): Promise<T> {
    return (this.model as any).create({
      data,
      include: include ?? this.repositoryInclude,
    });
  }

  async createMany (
    data: CreateType[],
    include?: IncludeType,
  ): Promise<BatchPayloadType> {
    return (this.model as any).createMany({ data });
  }

  async update (
    where: WhereType,
    data: UpdateType,
    include?: IncludeType,
  ): Promise<BatchPayloadType> {
    return (this.model as any).updateMany({
      where,
      data,
    });
  }

  async updateById<T = Dto> (
    id: string,
    data: UpdateType,
    include?: IncludeType,
  ): Promise<T> {
    return (this.model as any).update({
      where: { id },
      data,
      include: include ?? this.repositoryInclude,
    });
  }

  async delete (where: WhereType): Promise<BatchPayloadType> {
    return (this.model as any).deleteMany({ where });
  }

  async deleteById<T = Dto> (id: string, include?: IncludeType): Promise<T> {
    return (this.model as any).delete({
      where: { id },
      include: include ?? this.repositoryInclude,
    });
  }

  async count (where: WhereType): Promise<number> {
    return (this.model as any).count({ where });
  }

  async upsert<T = Dto> (
    where: WhereUniqueType,
    create: CreateType,
    update: UpdateType,
  ): Promise<T[]> {
    return (this.model as any).upsert({
      where,
      update,
      create,
    });
  }

  async exists (where: WhereType): Promise<boolean> {
    const result = await this.count(where);
    return result > 0;
  }
}
