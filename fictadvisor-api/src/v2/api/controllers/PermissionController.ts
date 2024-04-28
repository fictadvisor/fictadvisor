import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';
import { CheckPermissionsResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { PermissionService } from '../services/PermissionService';

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
    InvalidEntityIdException: 
      User with such id is not found
      
    DataNotFoundException:
      Data were not found
      
    InvalidBodyException:
      obj.permissions: permissions must be an array
      obj.permissions: each value in permissions must be one of the following values`,
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID of the user whose permissions to check',
  })
  @ApiEndpoint({
    summary: 'Validates user access for specified permissions',
  })
  @Post('/check')
  async checkPermissions (
      @Body() body: CheckPermissionsDTO,
      @Query('userId', UserByIdPipe) userId: string,
  ) {
    return this.permissionService.checkPermissions(userId, body);
  }
}
