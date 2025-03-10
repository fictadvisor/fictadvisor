export interface RepositoryInterface<Dto, Where, Sort = any> {
  findMany(
    where: Where,
    page?: { take: number; skip: number },
    sort?: Sort,
  ): Promise<Dto[]>;
  count(where: Where): Promise<number>;
}
