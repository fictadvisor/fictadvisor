import { Module } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { PrismaService } from '../../database/PrismaService';
import { SubjectController } from './SubjectController';

@Module({
  providers: [SubjectService, PrismaService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}