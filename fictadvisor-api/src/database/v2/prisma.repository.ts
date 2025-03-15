import { Prisma, PrismaClient } from '@prisma/client/fictadvisor';
import { RepositoryInterface } from '../interfaces/repository.interface';

export type Models = Prisma.TypeMap['meta']['modelProps'];
export type Where<Model extends Models> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['where'];
export type Sort<Model extends Models> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['orderBy']
export type Include<Model extends Models> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args'] extends { include?: infer T } ? T : never

export abstract class PrismaRepository<
  Model extends Models,
  Dto,
  WhereType=Where<Model>,
  SortType = Sort<Model>,
  IncludeType = Include<Model>,
  Create = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['create']['args']['data'],
  Update = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['update']['args']['data'],
  WhereUnique = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findUnique']['args']['where'],
  BatchPayload = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['updateMany']['result'],
> implements RepositoryInterface<Dto, WhereType, SortType, IncludeType> {
  protected constructor (
    protected readonly model: (typeof PrismaClient.prototype)[Model],
    private readonly repositoryInclude?: IncludeType,
  ) {}

  findMany (
    where: WhereType,
    include?: IncludeType,
    page?: { take: number; skip: number },
    orderBy?: SortType,
  ): Promise<Dto[]> {
    const methodInclude = {
      ...this.repositoryInclude,
      ...include,
    };

    return (this.model as any).findMany({
      where,
      orderBy,
      take: page?.take,
      skip: page?.skip,
      include: Object.keys(methodInclude).length ? methodInclude : undefined,
    });
  }

  findOne (where: WhereType): Promise<Dto> {
    return (this.model as any).findFirst({
      where,
      include: this.repositoryInclude,
    });
  }

  create (data: Create): Promise<Dto> {
    return (this.model as any).create({
      data,
      include: this.repositoryInclude,
    });
  }

  createMany (data: Create[]): Promise<BatchPayload> {
    return (this.model as any).createMany({ data });
  }

  update (where: WhereType, data: Update): Promise<BatchPayload> {
    return (this.model as any).updateMany({
      where,
      data,
    });
  }

  updateById (id: string, data: Update): Promise<Dto> {
    return (this.model as any).update({
      where: { id },
      data,
      include: this.repositoryInclude,
    });
  }

  delete (where: WhereType): Promise<BatchPayload> {
    return (this.model as any).deleteMany({ where });
  }

  deleteById (id: string): Promise<Dto> {
    return (this.model as any).delete({
      where: { id },
      include: this.repositoryInclude,
    });
  }

  count (where: WhereType): Promise<number> {
    return (this.model as any).count({ where });
  }

  upsert (where: WhereUnique, create: Create, update: Update): Promise<Dto[]> {
    return (this.model as any).upsert({ where, update, create });
  }
}
