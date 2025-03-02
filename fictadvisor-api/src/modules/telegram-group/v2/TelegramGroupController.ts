import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTelegramGroupDTO,
  UpdateTelegramGroupDTO,
} from '@fictadvisor/utils/requests';
import {
  TelegramGroupsResponse,
  TelegramGroupsByTelegramIdResponse,
  TelegramGroupResponse,
} from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { TelegramGuard } from '../../../common/guards/telegram/TelegramGuard';
import { TelegramGroupByIdPipe } from '../../../common/pipes/TelegramGroupByIdPipe';
import { GroupByIdPipe } from '../../../common/pipes/GroupByIdPipe';
import { TelegramGroupMapper } from '../../../common/mappers/TelegramGroupMapper';
import { TelegramGroupService } from './TelegramGroupService';
import { TelegramGroupDocumentation } from '../../../common/documentation/modules/v2/telegramGroup';

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

  @ApiEndpoint({
    summary: 'Create telegram group',
    guards: TelegramGuard,
    documentation: TelegramGroupDocumentation.CREATE,
  })
  @Post('/:groupId')
  async create (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: CreateTelegramGroupDTO,
  ): Promise<TelegramGroupResponse> {
    const telegramGroup = await this.telegramGroupService.create(groupId, body);
    return this.telegramGroupMapper.getTelegramGroup(telegramGroup);
  }

  @ApiEndpoint({
    summary: 'Update telegram group',
    guards: TelegramGuard,
    documentation: TelegramGroupDocumentation.UPDATE,
  })
  @Patch()
  async update (
    @Query('telegramId', TelegramGroupByIdPipe) telegramId: bigint,
    @Query('groupId', GroupByIdPipe) groupId: string,
    @Body() body: UpdateTelegramGroupDTO,
  ): Promise<TelegramGroupResponse> {
    const telegramGroup = await this.telegramGroupService.update(
      telegramId,
      groupId,
      body,
    );
    return this.telegramGroupMapper.getTelegramGroup(telegramGroup);
  }

  @ApiEndpoint({
    summary: 'Delete telegram group',
    guards: TelegramGuard,
    documentation: TelegramGroupDocumentation.DELETE,
  })
  @Delete()
  async delete (
    @Query('telegramId', TelegramGroupByIdPipe) telegramId: bigint,
    @Query('groupId', GroupByIdPipe) groupId: string,
  ): Promise<TelegramGroupResponse> {
    const telegramGroup = await this.telegramGroupService.delete(
      telegramId,
      groupId,
    );
    return this.telegramGroupMapper.getTelegramGroup(telegramGroup);
  }

  @ApiEndpoint({
    summary: 'Get telegram groups connected to university group',
    guards: TelegramGuard,
    documentation: TelegramGroupDocumentation.GET_BY_ID,
  })
  @Get('/:groupId')
  async getAll (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<TelegramGroupsResponse> {
    const telegramGroups = await this.telegramGroupService.getAll(groupId);
    return this.telegramGroupMapper.getTelegramGroups(telegramGroups);
  }

  @ApiEndpoint({
    summary: 'Get telegram group',
    guards: TelegramGuard,
    documentation: TelegramGroupDocumentation.GET_ALL,
  })
  @Get('/telegram/:telegramId')
  async getById (
    @Param('telegramId', TelegramGroupByIdPipe) telegramId: bigint,
  ): Promise<TelegramGroupsByTelegramIdResponse> {
    const telegramGroups = await this.telegramGroupService.getGroupByTelegramId(
      telegramId,
    );
    return this.telegramGroupMapper.getTelegramGroupsByTelegramId(telegramGroups);
  }
}
