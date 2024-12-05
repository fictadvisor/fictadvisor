import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { PermissionService } from '../services/PermissionService';
import { JwtGuard } from '../../security/JwtGuard';
import { PermissionDocumentation } from '../../utils/documentation/permission';

@ApiTags('Permission')
@Controller({
  version: '2',
  path: '/permissions',
})
export class PermissionController {
  constructor (
    private permissionService: PermissionService,
  ) {}

  @ApiEndpoint({
    summary: 'Validates user access for specified permissions',
    documentation: PermissionDocumentation.CHECK_PERMISSIONS,
    guards: JwtGuard,
  })
  @Post('/check')
  async checkPermissions (
    @Request() req,
    @Body() body: CheckPermissionsDTO,
  ) {
    const permissions = await this.permissionService.checkPermissions(
      req.user.id,
      body,
    );
    return { permissions };
  }
}
