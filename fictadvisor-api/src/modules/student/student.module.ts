import { Module } from '@nestjs/common';
import { StudentController } from './v2/student.controller';
import { StudentService } from './v2/student.service';
import { MapperModule } from '../../common/mappers/mapper.module';
import { PrismaModule } from '../../database/prisma.module';
import { PermissionModule } from '../permission/permission.module';
import { UserModule } from '../user/user.module';
import { GroupModule } from '../group/group.module';

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
