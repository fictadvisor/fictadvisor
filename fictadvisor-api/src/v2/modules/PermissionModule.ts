import { Module } from '@nestjs/common';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { PermissionController } from '../api/controllers/PermissionController';
import { PermissionService } from '../api/services/PermissionService';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
  imports: [AccessModule],
})
export class PermissionModule {}