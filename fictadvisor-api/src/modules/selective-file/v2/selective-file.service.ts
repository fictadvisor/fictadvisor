import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { read, utils } from 'xlsx';
import { FileService } from '../../file/file.service';
import { DateService } from '../../date/v2/date.service';
import {
  SelectiveDisciplineService,
  SelectiveParseSummary,
} from '../../discipline/v2/selective-discipline.service';
import { DataNotFoundException } from '../../../common/exceptions/data-not-found.exception';

// Files live under one prefix, one per academic year, named by the server:
// `<year>.csv`. `UserService.putSelective` reads the very same objects when it
// backfills a freshly approved student, so the layout is a contract, not an
// implementation detail.
export const SELECTIVE_DIRECTORY = 'selective';

const CSV_SEPARATOR = ';';

export interface SelectiveFileInfo {
  year: number;
  name: string;
  size: number;
  updatedAt: Date;
}

@Injectable()
export class SelectiveFileService {
  constructor (
    private readonly fileService: FileService,
    private readonly dateService: DateService,
    private readonly selectiveDisciplineService: SelectiveDisciplineService,
  ) {}

  async getAll (): Promise<SelectiveFileInfo[]> {
    const files = await this.fileService.listFiles(SELECTIVE_DIRECTORY);

    return files
      .map(({ name, size, updatedAt }) => ({
        year: parseInt(name.replace(extname(name), '')),
        name,
        size,
        updatedAt,
      }))
      .filter(({ year }) => !isNaN(year))
      .sort((a, b) => b.year - a.year);
  }

  // Anything the admin picks is stored as the semicolon-separated CSV the
  // parser reads, so a workbook and a plain export end up indistinguishable.
  async upload (file: Express.Multer.File, year: number): Promise<SelectiveFileInfo> {
    const content = extname(file.originalname).toLowerCase() === '.csv'
      ? file.buffer.toString('utf-8')
      : SelectiveFileService.workbookToCsv(file.buffer);

    await this.fileService.saveContent(
      this.getPath(year),
      content,
      'text/csv; charset=utf-8',
    );

    return {
      year,
      name: this.getFileName(year),
      size: Buffer.byteLength(content),
      updatedAt: new Date(),
    };
  }

  async delete (year: number): Promise<void> {
    await this.getContent(year);
    await this.fileService.deleteByPath(this.getPath(year));
  }

  async parse (year: number, semester: number): Promise<SelectiveParseSummary> {
    // Refuse a semester the schedule does not know: the parse writes
    // disciplines and selective amounts stamped with it, and a typo would
    // scatter them across a semester nothing else can see.
    await this.dateService.getSemester({ year, semester });

    const content = await this.getContent(year);

    return this.selectiveDisciplineService.parse(content, { year, semester });
  }

  private async getContent (year: number): Promise<string> {
    const content = await this.fileService.findFileContent(this.getPath(year));

    if (content === undefined) throw new DataNotFoundException();

    return content;
  }

  private static workbookToCsv (buffer: Buffer): string {
    const workbook = read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) throw new DataNotFoundException();

    return utils.sheet_to_csv(workbook.Sheets[sheetName], { FS: CSV_SEPARATOR });
  }

  private getFileName (year: number): string {
    return `${year}.csv`;
  }

  private getPath (year: number): string {
    return `${SELECTIVE_DIRECTORY}/${this.getFileName(year)}`;
  }
}
