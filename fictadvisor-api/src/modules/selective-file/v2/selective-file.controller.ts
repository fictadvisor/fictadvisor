import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSION } from '@fictadvisor/utils/security';
import {
  ParseSelectiveFileQueryDTO,
  UploadSelectiveFileQueryDTO,
} from '@fictadvisor/utils/requests';
import {
  SelectiveFileResponse,
  SelectiveFilesResponse,
  SelectiveParseResponse,
} from '@fictadvisor/utils/responses';
import { SelectiveFileService } from './selective-file.service';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { SelectiveFileDocumentation } from '../../../common/documentation/modules/v2/selective-file';
import { SelectiveFileValidationPipe } from '../../../common/pipes/selective-file-validation.pipe';

@ApiTags('SelectiveFiles')
@Controller({
  version: '2',
  path: '/selectiveFiles',
})
export class SelectiveFileController {
  constructor (
    private readonly selectiveFileService: SelectiveFileService,
  ) {}

  @ApiEndpoint({
    summary: 'Get every uploaded selective file',
    documentation: SelectiveFileDocumentation.GET_ALL,
    permissions: PERMISSION.SELECTIVE_FILES_GET,
  })
  @Get()
  async getAll (): Promise<SelectiveFilesResponse> {
    const files = await this.selectiveFileService.getAll();
    return { files: files.map(SelectiveFileController.toResponse) };
  }

  @ApiEndpoint({
    summary: 'Upload the selectives of a year, replacing the file it already has',
    documentation: SelectiveFileDocumentation.UPLOAD,
    permissions: PERMISSION.SELECTIVE_FILES_CREATE,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async upload (
    @Query() { year }: UploadSelectiveFileQueryDTO,
    @UploadedFile(SelectiveFileValidationPipe) file: Express.Multer.File,
  ): Promise<SelectiveFileResponse> {
    const uploaded = await this.selectiveFileService.upload(file, year);
    return SelectiveFileController.toResponse(uploaded);
  }

  @ApiEndpoint({
    summary: 'Delete the selective file of a year',
    documentation: SelectiveFileDocumentation.DELETE,
    permissions: PERMISSION.SELECTIVE_FILES_DELETE,
  })
  @Delete('/:year')
  async delete (
    @Param('year', ParseIntPipe) year: number,
  ): Promise<void> {
    return this.selectiveFileService.delete(year);
  }

  @ApiEndpoint({
    summary: 'Import one semester of a year\'s selectives into the database',
    documentation: SelectiveFileDocumentation.PARSE,
    permissions: PERMISSION.SELECTIVE_FILES_PARSE,
  })
  @Post('/:year/parse')
  async parse (
    @Param('year', ParseIntPipe) year: number,
    @Query() { semester }: ParseSelectiveFileQueryDTO,
  ): Promise<SelectiveParseResponse> {
    return this.selectiveFileService.parse(year, semester);
  }

  private static toResponse (
    { year, name, size, updatedAt }: { year: number, name: string, size: number, updatedAt: Date },
  ): SelectiveFileResponse {
    return { year, name, size, updatedAt: updatedAt.toISOString() };
  }
}
