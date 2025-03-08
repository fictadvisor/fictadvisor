export interface RepositoryInterface<Dto, Where, Sort = any, Include = any> {
  findMany (
    where: Where,
    include?: Include,
    page?: { take: number; skip: number },
    sort?: Sort,
  ): Promise<Dto[]>;
  count(where: Where): Promise<number>;
}
