import { Module } from '@nestjs/common';
import { StudentController } from './v2/student.controller';
import { StudentService } from './v2/student.service';
import { PrismaModule } from '../../database/prisma.module';
import { PermissionModule } from '../permission/permission.module';
import { UserModule } from '../user/user.module';
import { GroupModule } from '../group/group.module';
import { StudentMapperModule } from './v2/mappers/student-mapper.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
  imports: [
    PrismaModule,
    PermissionModule,
    UserModule,
    GroupModule,
    StudentMapperModule,
  ],
})
export class StudentModule {}
