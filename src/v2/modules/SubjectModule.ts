import { Module } from '@nestjs/common';
import { SubjectService } from '../api/services/SubjectService';
import { SubjectController } from '../api/controllers/SubjectController';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
  imports: [PrismaModule, AccessModule, MapperModule],
})
export class SubjectModule {}