import { Module } from '@nestjs/common';
import { GroupController } from '../api/controllers/GroupController';
import { GroupService } from '../api/services/GroupService';
import { GroupByIdPipe } from '../api/pipes/GroupByIdPipe';
import { PrismaModule } from './PrismaModule';
import { UserModule } from './UserModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { DateModule } from '../utils/date/DateModule';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe],
  exports: [GroupService, GroupByIdPipe],
  imports: [PrismaModule, UserModule, AccessModule, MapperModule, DateModule],
})
export class GroupModule {}