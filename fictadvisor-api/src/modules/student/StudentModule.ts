import { Module } from '@nestjs/common';
import { StudentController } from './v2/StudentController';
import { StudentService } from './v2/StudentService';
import { MapperModule } from '../../common/mappers/MapperModule';
import { PrismaModule } from '../../database/PrismaModule';
import { PermissionModule } from '../permission/PermissionModule';
import { UserModule } from '../user/UserModule';
import { GroupModule } from '../group/GroupModule';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
  imports: [
    MapperModule,
    PrismaModule,
    PermissionModule,
    UserModule,
    GroupModule,
  ],
})
export class StudentModule {}
