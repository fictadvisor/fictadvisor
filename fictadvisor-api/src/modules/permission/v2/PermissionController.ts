import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { GetUser } from '../../../common/decorators/GetUser';
import { PermissionService } from './PermissionService';
import { JwtGuard } from '../../../common/guards/auth/JwtGuard';
import { PermissionDocumentation } from '../../../common/documentation/modules/v2/permission';

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
    @GetUser('id') userId: string,
    @Body() body: CheckPermissionsDTO,
  ) {
    const permissions = await this.permissionService.checkPermissions(
      userId,
      body,
    );
    return { permissions };
  }
}
