import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { DocumentService } from '../services/DocumentService';
import { StudyContractDTO } from '../dtos/StudyContractDTO';
import { Access } from '../../security/Access';
import { PriorityDTO } from '../dtos/PriorityDTO';

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
      Passport number can not be empty
      Passport Institute can not be empty
      Passport date cannot be empty
      Settlement cannot be empty
      Address cannot be empty
      Index cannot be empty
      Phone number cannot be empty
      Email is not an email
      Email is empty
      The specialty code is not valid
      Study type must be an enum
      Study type cannot be empty
      Study form must be an enum
      Study form cannot be empty
      Payment type must be an enum
      isToAdmission form must be boolean
      isToAdmission cannot be empty
      
    ObjectIsRequiredException:
      Payment type is required`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  async generateContract (
    @Body() body: StudyContractDTO,
  ) {
    return this.documentService.generateStudyContract(body);
  }

  @Access('documents.priority.create')
  @Post('/priority')
  @ApiBearerAuth()
  @ApiOkResponse()
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
}