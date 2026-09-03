import { Module } from '@nestjs/common';
import { SelectiveFileController } from './v2/selective-file.controller';
import { SelectiveFileService } from './v2/selective-file.service';
import { FileModule } from '../file/file.module';
import { DateModule } from '../date/date.module';
import { DisciplineModule } from '../discipline/discipline.module';
import { AccessModule } from '../access/access.module';

@Module({
  controllers: [SelectiveFileController],
  providers: [SelectiveFileService],
  imports: [AccessModule, FileModule, DateModule, DisciplineModule],
})
export class SelectiveFileModule {}
