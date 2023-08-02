import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { EntrantService } from '../services/EntrantService';
import { EntrantMapper } from '../../mappers/EntrantMapper';
import { Access } from '../../security/Access';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EntrantWithContractResponse } from '../responses/EntrantWithContractResponse';
import { NamesDTO } from '../dtos/NamesDTO';
import { EntrantWithPriorityResponse } from '../responses/EntrantWithPriorityResponse';

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

  @Access('entrant.contract.create')
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
  async saveContract (
    @Body() body: CreateContractDTO,
  ) {
    const entrant = await this.entrantService.saveContract(body);
    return this.entrantMapper.getEntrantWithContract(entrant);
  }

  @Access('admission.priorities.get')
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
      First name is incorrect (A-Я(укр.)\\-' )
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-' )
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-' )
      
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
    @Query() query: NamesDTO,
  ) {
    const entrant = await this.entrantService.getPriority(query);
    return this.entrantMapper.getEntrantWithPriority(entrant);
  }

  @Access('admission.priorities.approve')
  @ApiBearerAuth()
  @Patch('/priority/approve')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
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
    @Body() body: NamesDTO,
  ) {
    await this.entrantService.approvePriority(body);
  }
}