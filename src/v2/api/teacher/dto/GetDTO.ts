import { SearchDTO } from '../../utils/dto/SearchDTO';
import { PageDTO } from '../../utils/dto/PageDTO';
import { SortDTO } from '../../utils/dto/SortDTO';

export interface GetDTO<T = any> extends SearchDTO, PageDTO, SortDTO<T> {}