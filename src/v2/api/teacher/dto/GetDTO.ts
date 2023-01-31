import { type SearchDTO } from '../../utils/dto/SearchDTO';
import { type PageDTO } from '../../utils/dto/PageDTO';
import { type SortDTO } from '../../utils/dto/SortDTO';

export interface GetDTO<T = any> extends SearchDTO, PageDTO, SortDTO<T> {}
