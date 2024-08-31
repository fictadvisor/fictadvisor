import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateTelegramGroupDTO,
  UpdateTelegramGroupDTO,
} from '@fictadvisor/utils/requests';
import {
  TelegramGroupResponse,
  TelegramGroupsResponse,
  TelegramGroupsByTelegramIdResponse,
} from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { TelegramGuard } from '../../security/TelegramGuard';
import { TelegramGroupByIdPipe } from '../pipes/TelegramGroupByIdPipe';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { TelegramGroupMapper } from '../../mappers/TelegramGroupMapper';
import { TelegramGroupService } from '../services/TelegramGroupService';

@ApiTags('TelegramGroup')
@Controller({
  version: '2',
  path: '/telegramGroups',
})
export class TelegramGroupController {
  constructor (
    private telegramGroupService: TelegramGroupService,
    private telegramGroupMapper: TelegramGroupMapper,
  ) {}

  @ApiCookieAuth()
  @ApiOkResponse({
    type: TelegramGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      TelegramId can not be empty
      TelegramId is not a number
      Source can not be empty
      Source is not an enum
      ThreadId is not a number
      PostInfo can not be empty
      PostInfo is not a boolean
      
    ObjectIsRequiredException:
      Thread ID is required
      
    AlreadyExistException:
      TelegramGroup already exist
      
    InvalidEntityIdException:
      Group with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'University group id to which to add telegram group',
  })
  @ApiEndpoint({
    summary: 'Create telegram group',
    guards: TelegramGuard,
  })
  @Post('/:groupId')
  async create (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: CreateTelegramGroupDTO,
  ) {
    const telegramGroup = await this.telegramGroupService.create(groupId, body);
    return this.telegramGroupMapper.getTelegramGroup(telegramGroup);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: TelegramGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      TelegramId is not a number
      Source is not an enum
      ThreadId is not a number
      PostInfo is not a boolean
    
    InvalidEntityIdException:
      TelegramGroup with such id is not found
      Group with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiQuery({
    name: 'telegramId',
    type: Number,
    required: true,
    description: 'Id of telegram group to update',
  })
  @ApiQuery({
    name: 'groupId',
    required: true,
    description: 'University group id to which telegram group is connected',
  })
  @ApiEndpoint({
    summary: 'Update telegram group',
    guards: TelegramGuard,
  })
  @Patch()
  async update (
    @Query('telegramId', TelegramGroupByIdPipe) telegramId: bigint,
    @Query('groupId', GroupByIdPipe) groupId: string,
    @Body() body: UpdateTelegramGroupDTO,
  ) {
    const telegramGroup = await this.telegramGroupService.update(telegramId, groupId, body);
    return this.telegramGroupMapper.getTelegramGroup(telegramGroup);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: TelegramGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      TelegramGroup with such id is not found
      Group with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiQuery({
    name: 'telegramId',
    type: Number,
    required: true,
    description: 'Id of telegram group to delete',
  })
  @ApiQuery({
    name: 'groupId',
    required: true,
    description: 'University group id to which telegram group is connected',
  })
  @ApiEndpoint({
    summary: 'Delete telegram group',
    guards: TelegramGuard,
  })
  @Delete()
  async delete (
    @Query('telegramId', TelegramGroupByIdPipe) telegramId: bigint,
    @Query('groupId', GroupByIdPipe) groupId: string,
  ) {
    const telegramGroup = await this.telegramGroupService.delete(telegramId, groupId);
    return this.telegramGroupMapper.getTelegramGroup(telegramGroup);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: TelegramGroupsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Group with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of university group from which to get telegram groups',
  })
  @ApiEndpoint({
    summary: 'Get telegram groups connected to university group',
    guards: TelegramGuard,
  })
  @Get('/:groupId')
  async getTelegramGroups (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const telegramGroups = await this.telegramGroupService.getAll(groupId);
    return this.telegramGroupMapper.getTelegramGroups(telegramGroups);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: TelegramGroupsByTelegramIdResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      TelegramGroup with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'telegramId',
    type: Number,
    required: true,
    description: 'Id of the telegram group to get information',
  })
  @ApiEndpoint({
    summary: 'Get telegram group',
    guards: TelegramGuard,
  })
  @Get('/telegram/:telegramId')
  async getGroupsByTelegramId (
    @Param('telegramId', TelegramGroupByIdPipe) telegramId: bigint,
  ) {
    const telegramGroups = await this.telegramGroupService.getGroupByTelegramId(telegramId);
    return this.telegramGroupMapper.getGroupsByTelegramId(telegramGroups);
  }
}
