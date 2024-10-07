import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';
import { CheckPermissionsResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { PermissionService } from '../services/PermissionService';
import { JwtGuard } from '../../security/JwtGuard';

@ApiTags('Permission')
@Controller({
  version: '2',
  path: '/permissions',
})
export class PermissionController {
  constructor (
      private permissionService: PermissionService,
  ) {}

  @ApiOkResponse({
    type: CheckPermissionsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n      
    DataNotFoundException:
      Data were not found
      
    InvalidBodyException:
      obj.permissions: permissions must be an array
      obj.permissions: each value in permissions must be one of the following values`,
  })
  @ApiEndpoint({
    summary: 'Validates user access for specified permissions',
    guards: JwtGuard,
  })
  @Post('/check')
  async checkPermissions (
    @Request() req,
    @Body() body: CheckPermissionsDTO,
  ) {
    return this.permissionService.checkPermissions(req.user.id, body);
  }
}
