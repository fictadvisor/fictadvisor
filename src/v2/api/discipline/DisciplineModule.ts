import { forwardRef, Module } from '@nestjs/common';
import { DisciplineController } from './DisciplineController';
import { DisciplineService } from './DisciplineService';
import { TeacherModule } from '../teacher/TeacherModule';
import { DisciplineTypeService } from './DisciplineTypeService';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { AccessModule } from 'src/v2/security/AccessModule';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, DisciplineTypeService],
  exports: [DisciplineService, DisciplineTypeService],
  imports: [forwardRef(() => TeacherModule), PrismaModule, forwardRef(() => (UserModule)), AccessModule],
})
export class DisciplineModule {}