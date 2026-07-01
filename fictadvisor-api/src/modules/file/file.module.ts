import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigurationModule } from '../../config/config.module';

@Module({
  imports: [ConfigurationModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
