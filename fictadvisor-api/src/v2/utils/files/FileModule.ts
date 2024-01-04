import { Module } from '@nestjs/common';
import { FileService } from './FileService';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
