import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StudyContractDTO, PriorityDTO } from '@fictadvisor/utils/requests';
import { EntrantByIdPipe } from '../pipes/EntrantByIdPipe';
import { DocumentService } from '../services/DocumentService';

@ApiTags('Document')
@Controller({
  version: '2',
  path: '/documents',
})
export class DocumentController {
  constructor (
    private documentService: DocumentService,
  ) {}

  @Post('/contract')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n  
    InvalidBodyException:
      First name can not be empty
      Last name can not be empty
      Passport number can not be empty
      Passport Institute can not be empty
      Passport date cannot be empty
      Settlement cannot be empty
      Address cannot be empty
      Index cannot be empty
      Phone number cannot be empty
      Email cannot be empty empty
      The specialty code cannot be empty
      Study type cannot be empty
      Study form cannot be empty
      isToAdmission cannot be empty
      
    ObjectIsRequiredException:
      Payment type is required`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  async createContract (
    @Body() body: StudyContractDTO,
  ) {
    return this.documentService.createContract(body);
  }

  @Post('/priority')
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
      Last name is incorrect (A-Я(укр.)\\-\` )
      The specialty code is not valid
      1st priority must be an enum
      1st priority cannot be empty
      2nd priority must be an enum
      2nd priority cannot be empty
      3rd priority must be an enum
      isToAdmission form must be boolean
      isToAdmission cannot be empty
      Day cannot be empty
      Email is not an email
      Email is empty
      
    InvalidEducationProgramsException:
      Education programs is invalid`,
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
  async generatePriority (
    @Body() body: PriorityDTO,
  ) {
    return this.documentService.generatePriority(body);
  }

  @Get('/contract/:entrantId')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n     
    InvalidEntityIdException:
      Entrant with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  async sendContract (
    @Param('entrantId', EntrantByIdPipe) entrantId: string,
  ) {
    return this.documentService.getContract(entrantId);
  }

  @Get('/priority/:entrantId')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n     
    InvalidEntityIdException:
      Entrant with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  })
  async sendPriority (
    @Param('entrantId', EntrantByIdPipe) entrantId: string,
  ) {
    return this.documentService.getPriority(entrantId);
  }
}