import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchableQueryDto } from '../../common/common.dto';
import { SearchResultDto } from './dto/search-result.dto';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  getSearchResult(
    @Query() query: SearchableQueryDto
  ): Promise<SearchResultDto> {
    return this.searchService.searchResult(query);
  }
}
