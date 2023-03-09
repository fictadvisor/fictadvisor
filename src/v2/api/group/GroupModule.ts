import { Module } from '@nestjs/common';
import { GroupController } from './GroupController';
import { GroupService } from './GroupService';
import { GroupByIdPipe } from './pipe/GroupByIdPipe';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { AccessModule } from '../../security/AccessModule';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe],
  exports: [GroupService, GroupByIdPipe],
  imports: [DisciplineModule, PrismaModule, UserModule, AccessModule],
})
export class GroupModule {}