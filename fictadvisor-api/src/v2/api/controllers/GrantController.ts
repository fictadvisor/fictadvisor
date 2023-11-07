import { Controller, Delete, Param } from '@nestjs/common';
import { GrantService } from '../services/GrantService';
import { GrantMapper } from '../../mappers/GrantMapper';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse,
  ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PERMISSION } from '../../security/PERMISSION';
import { MappedGrant } from '../responses/GrantResponse';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { GrantByIdPipe } from '../pipes/GrantByIdPipe';

@ApiTags('Grants')
@Controller({
  version: '2',
  path: '/grants',
})
export class GrantController {
  constructor (
    private grantService: GrantService,
    private grantMapper: GrantMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGrant,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGrantIdException:
      Grant with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'grantId',
    required: true,
    description: 'Id of certain grant',
  })
  @ApiEndpoint({
    summary: 'Delete certain grant',
    permissions: PERMISSION.GRANTS_DELETE,
  })
  @Delete('/:grantId')
  async delete (
    @Param('grantId', GrantByIdPipe) grantId: string,
  ) {
    const grant = await this.grantService.delete(grantId);
    return this.grantMapper.getMappedGrant(grant);
  }


}