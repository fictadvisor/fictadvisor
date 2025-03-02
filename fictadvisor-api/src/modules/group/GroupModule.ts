import { Module } from '@nestjs/common';
import { GroupController } from './v2/GroupController';
import { GroupService } from './v2/GroupService';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { DateModule } from '../date/DateModule';
import { ConfigurationModule } from '../../config/ConfigModule';
import { FileModule } from '../file/FileModule';
import { CathedraModule } from '../cathedra/CathedraModule';
import { EduProgramModule } from '../edu-program/EduProgramModule';
import { GroupByIdPipe } from '../../common/pipes/GroupByIdPipe';
import { StudentByIdPipe } from '../../common/pipes/StudentByIdPipe';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe, StudentByIdPipe],
  exports: [GroupService, GroupByIdPipe, StudentByIdPipe],
  imports: [
    PrismaModule,
    UserModule,
    AccessModule,
    MapperModule,
    DateModule,
    ConfigurationModule,
    FileModule,
    CathedraModule,
    EduProgramModule,
  ],
})
export class GroupModule {}
