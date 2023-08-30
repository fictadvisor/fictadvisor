import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CheckPermissionsDTO } from '../dtos/CheckPermissionsDTO';
import { PermissionService } from '../services/PermissionService';
import { CheckPermissionsResponse } from '../responses/CheckPermissionsResponse';
import { UserByIdPipe } from '../pipes/UserByIdPipe';

@ApiTags('Permission')
@Controller({
  version: '2',
  path: '/permissions',
})
export class PermissionController {
  constructor (
      private permissionService: PermissionService,
  ) {}

  @Get('/check')
  @ApiQuery({
    name: 'userId',
    required: true,
  })
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
  async checkPermissions (
      @Body() body: CheckPermissionsDTO,
      @Query('userId', UserByIdPipe) userId: string,
  ) {
    return this.permissionService.checkPermissions(userId, body);
  }
}
