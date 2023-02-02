import { Module } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { SubjectController } from './SubjectController';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { DisciplineModule } from "../discipline/DisciplineModule";

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
  imports: [PrismaModule, UserModule, DisciplineModule],
})
export class SubjectModule {}