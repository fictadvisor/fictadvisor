import { DatabaseUtils as GeneralUtils, PaginateArgs as Args } from '../database.utils';
import { TModels, TWhere } from '../types/repository.types';
import { RepositoryInterface } from '../interfaces/repository.interface';
import { PageDTO } from '@fictadvisor/utils/requests';
import { Prisma } from '@prisma/client/cohorta';
import { PaginatedData } from '../types/paginated.data';

export type PaginateArgs<T extends TModels<Prisma.TypeMap>> = Args<Prisma.TypeMap, T>

export class DatabaseUtils extends GeneralUtils {
  static async paginate<T extends TModels<Prisma.TypeMap>, Dto> (
    repository: RepositoryInterface<Dto, TWhere<Prisma.TypeMap, T>>,
    pageDTO: PageDTO,
    args: PaginateArgs<T>
  ): Promise<PaginatedData<Dto>> {
    return this.generalPaginate(repository, pageDTO, args);
  }
}
