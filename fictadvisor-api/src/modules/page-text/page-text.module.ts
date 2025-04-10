import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { PageTextService } from './v2/page-text.service';
import { PageTextController } from './v2/page-text.controller';

@Module({
  providers: [PageTextService],
  controllers: [PageTextController],
  exports: [PageTextService],
  imports: [PrismaModule, AccessModule],
})
export class PageTextModule {}
