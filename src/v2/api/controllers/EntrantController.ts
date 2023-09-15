import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { Actions, EntrantService } from '../services/EntrantService';
import { EntrantMapper } from '../../mappers/EntrantMapper';
import { Access } from '../../security/Access';
import { PERMISSION } from '../../security/PERMISSION';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EntrantWithContractResponse } from '../responses/EntrantWithContractResponse';
import { EntrantWithPriorityResponse } from '../responses/EntrantWithPriorityResponse';
import { EntrantFullResponse } from '../responses/EntrantFullResponse';
import { DeleteEntrantDataQueryDTO } from '../dtos/DeleteEntrantDataQueryDTO';
import { FullNameWithSpecialtyDTO } from  '../dtos/FullNameWithSpecialtyDTO';

@ApiTags('Entrants')
@Controller({
  version: '2',
  path: '/entrants',
})
export class EntrantController {
  constructor (
    private readonly entrantService: EntrantService,
    private readonly entrantMapper: EntrantMapper,
  ) {}

  @Access(PERMISSION.ENTRANT_CONTRACT_CREATE)
  @ApiBearerAuth()
  @Post('/contract')
  @ApiOkResponse({
    type: EntrantWithContractResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)' )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)
      The specialty code is not valid
      CompetitivePoint can not be empty
      Number can not be empty
      Date can not be empty
      Group can not be empty
      Entrant can not be empty
      Contract can not be empty
    `,
  })
  @ApiNotFoundResponse({
    description: `\n
    NotFoundException:
      Entrant is not found`,
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
  async approveContract (
    @Body() body: CreateContractDTO,
  ) {
    return  await this.entrantService.approveContract(body);
  }

  @Access(PERMISSION.ADMISSION_PRIORITIES_GET)
  @Get('/priority')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: EntrantWithPriorityResponse,
  })
  @ApiBadRequestResponse({
    description: `\n  
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-\` )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-\` )
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-\` )
      
    DataNotFoundException:
      Data were not found
      
    AlreadyExistException:
      Contract already exist 
    `,
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
  async getEntrantPriority (
    @Query() query: FullNameWithSpecialtyDTO,
  ) {
    const entrant = await this.entrantService.getPriority(query);
    return this.entrantMapper.getEntrantWithPriority(entrant);
  }

  @Access(PERMISSION.ADMISSION_PRIORITIES_APPROVE)
  @ApiBearerAuth()
  @Patch('/priority/approve')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-\` )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-\` )
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-\` ))
      
    DataNotFoundException:
      Data were not found
    `,
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
  async approvePriority (
    @Body() body: FullNameWithSpecialtyDTO,
  ) {
    await this.entrantService.approvePriority(body);
  }

  @Access(PERMISSION.ADMISSION_PRIORITIES_APPROVE)
  @ApiBearerAuth()
  @Patch('/priority/approve/:entrantId')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-\` )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-\` )
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-\` ))
      
    DataNotFoundException:
      Data were not found
    `,
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
  async approvePriorityById (
    @Param('entrantId') entrantId: string
  ) {
    await this.entrantService.approvePriorityById(entrantId);
  }

  @Access(PERMISSION.ADMISSION_DELETE)
  @ApiBearerAuth()
  @Delete('/data')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-\` )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-\` )
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-\` ))
      Action priority must be an enum
      Action cannot be empty
      
    DataNotFoundException:
      Data were not found`,
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
  async deleteEntrantData (
    @Query() query: DeleteEntrantDataQueryDTO,
  ) {
    await this.entrantService.deleteEntrantByFullName(query);
  }

  @Access(PERMISSION.ADMISSION_GET)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    type: EntrantFullResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-\` )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-\` )
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-\` ))
    
    DataNotFoundException:
      Data were not found`,
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
  async get (
    @Query() query: FullNameWithSpecialtyDTO,
  ) {
    const entrant = await this.entrantService.get(query);
    return this.entrantMapper.getFullEntrant(entrant);
  }

  @Access(PERMISSION.ADMISSION_DELETE)
  @ApiBearerAuth()
  @Delete('/:entrantId')
  @ApiQuery({
    name: 'action',
    enum: Actions,
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    DataNotFoundException:
      Data were not found`,
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
  async delete (
    @Param('entrantId') entrantId: string,
    @Query('action') action: Actions,
  ) {
    await this.entrantService.deleteEntrantById(entrantId, action);
  }
}