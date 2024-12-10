import { Module } from '@nestjs/common';
import { GroupController } from '../api/controllers/GroupController';
import { GroupService } from '../api/services/GroupService';
import { GroupByIdPipe } from '../api/pipes/GroupByIdPipe';
import { PrismaModule } from './PrismaModule';
import { UserModule } from './UserModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { DateModule } from '../utils/date/DateModule';
import { ConfigurationModule } from './ConfigModule';
import { StudentOfGroupPipe } from '../api/pipes/StudentOfGroupPipe';
import { FileModule } from '../utils/files/FileModule';
import { CathedraModule } from './CathedraModule';
import { EduProgramModule } from './EduProgramModule';
import { StudentByIdPipe } from '../api/pipes/StudentByIdPipe';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe, StudentOfGroupPipe, StudentByIdPipe],
  exports: [GroupService, GroupByIdPipe],
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
