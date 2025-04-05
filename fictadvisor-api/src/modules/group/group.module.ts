import { Module } from '@nestjs/common';
import { GroupController } from './v2/group.controller';
import { GroupService } from './v2/group.service';
import { PrismaModule } from '../../database/prisma.module';
import { UserModule } from '../user/user.module';
import { AccessModule } from '../access/access.module';
import { DateModule } from '../date/date.module';
import { ConfigurationModule } from '../../config/config.module';
import { FileModule } from '../file/file.module';
import { CathedraModule } from '../cathedra/cathedra.module';
import { EduProgramModule } from '../edu-program/edu-program.module';
import { GroupByIdPipe } from '../../common/pipes/group-by-id.pipe';
import { StudentByIdPipe } from '../../common/pipes/student-by-id.pipe';
import { GroupMapperModule } from './v2/mappers/group-mapper.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe, StudentByIdPipe],
  exports: [GroupService, GroupByIdPipe, StudentByIdPipe],
  imports: [
    PrismaModule,
    UserModule,
    AccessModule,
    DateModule,
    ConfigurationModule,
    FileModule,
    CathedraModule,
    EduProgramModule,
    GroupMapperModule,
  ],
})
export class GroupModule {}
