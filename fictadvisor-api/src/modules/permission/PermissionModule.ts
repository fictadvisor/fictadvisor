import { forwardRef, Module } from '@nestjs/common';
import { AccessModule } from '../access/AccessModule';
import { PermissionController } from './v2/PermissionController';
import { PermissionService } from './v2/PermissionService';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
  imports: [forwardRef(() => AccessModule)],
})
export class PermissionModule {}
