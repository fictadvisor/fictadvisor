import { forwardRef, Module } from '@nestjs/common';
import { AccessModule } from '../access/access.module';
import { PermissionController } from './v2/permission.controller';
import { PermissionService } from './v2/permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
  imports: [forwardRef(() => AccessModule)],
})
export class PermissionModule {}
