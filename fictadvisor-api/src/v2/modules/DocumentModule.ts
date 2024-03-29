import { Module } from '@nestjs/common';
import { DocumentController } from '../api/controllers/DocumentController';
import { DocumentService } from '../api/services/DocumentService';
import { FileModule } from '../utils/files/FileModule';
import { EmailModule } from './EmailModule';
import { AccessModule } from './AccessModule';
import { PrismaModule } from './PrismaModule';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
  imports: [FileModule, EmailModule, AccessModule, PrismaModule],
})
export class DocumentModule {}