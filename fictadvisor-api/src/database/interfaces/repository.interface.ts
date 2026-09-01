export interface RepositoryInterface<Dto, Where, Sort = any, Include = any> {
  /**
   * The returned shape depends on the `include` the caller passes, so `T` can be
   * narrowed to the entity that matches it. It defaults to the repository's own
   * entity, which describes its default include.
   */
  findMany<T = Dto> (
    where: Where,
    include?: Include,
    page?: { take: number; skip: number },
    sort?: Sort,
  ): Promise<T[]>;
  count(where: Where): Promise<number>;
}
