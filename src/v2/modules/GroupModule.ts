import { Module } from '@nestjs/common';
import { GroupController } from '../api/controllers/GroupController';
import { GroupService } from '../api/services/GroupService';
import { GroupByIdPipe } from '../api/pipes/GroupByIdPipe';
import { PrismaModule } from './PrismaModule';
import { UserModule } from './UserModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe],
  exports: [GroupService, GroupByIdPipe],
  imports: [PrismaModule, UserModule, AccessModule, MapperModule],
})
export class GroupModule {}