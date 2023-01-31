import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchableQueryDto } from '../../common/common.dto';
import { type SearchResultDto } from './dto/search-result.dto';

@Controller('search')
export class SearchController {
  constructor (private readonly searchService: SearchService) {}

  @Get()
  async getSearchResult (
    @Query() query: SearchableQueryDto
  ): Promise<SearchResultDto> {
    return await this.searchService.searchResult(query);
  }
}
