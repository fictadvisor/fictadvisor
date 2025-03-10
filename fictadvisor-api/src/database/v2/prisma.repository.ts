import { Prisma, PrismaClient } from '@prisma/client/fictadvisor';
import { RepositoryInterface } from '../interfaces/repository.interface';

export type Models = Prisma.TypeMap['meta']['modelProps'];
export abstract class PrismaRepository<
  Model extends Models,
  Dto,
  Where = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['where'],
  Sort = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['orderBy'],
  Create = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['create']['args']['data'],
  Update = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['update']['args']['data'],
  WhereUnique = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findUnique']['args']['where'],
  BatchPayload = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['updateMany']['result'],
  Include = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args'] extends { include?: infer T } ? T : never
> implements RepositoryInterface<Dto, Where, Sort> {
  protected constructor (
    protected readonly model: (typeof PrismaClient.prototype)[Model],
    private readonly include?: Include,
  ) {}

  findMany (
    where: Where,
    page?: { take?: number; skip?: number },
    orderBy?: Sort,
    methodInclude?: Include,
  ): Promise<Dto[]> {
    return (this.model as any).findMany({
      where,
      orderBy,
      take: page?.take,
      skip: page?.skip,
      include: {
        ...this.include,
        ...methodInclude,
      },
    });
  }

  findOne (where: Where): Promise<Dto> {
    return (this.model as any).findFirst({
      where,
      include: this.include,
    });
  }

  create (data: Create): Promise<Dto> {
    return (this.model as any).create({ data, include: this.include });
  }

  createMany (data: Create[]): Promise<BatchPayload> {
    return (this.model as any).createMany({
      data,
      include: this.include,
    });
  }

  update (where: Where, data: Update): Promise<BatchPayload> {
    return (this.model as any).updateMany({
      where,
      data,
      include: this.include,
    });
  }

  updateById (where: WhereUnique, data: Update): Promise<Dto> {
    return (this.model as any).update({
      where,
      data,
      include: this.include,
    });
  }

  delete (where: Where): Promise<BatchPayload> {
    return (this.model as any).deleteMany({ where });
  }

  deleteById (where: WhereUnique): Promise<Dto> {
    return (this.model as any).delete({
      where,
      include: this.include,
    });
  }

  count (where: Where): Promise<number> {
    return (this.model as any).count({ where });
  }

  upsert (where: WhereUnique, create: Create, update: Update): Promise<Dto[]> {
    return (this.model as any).upsert({ where, update, create });
  }
}
