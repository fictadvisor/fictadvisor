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
  TelegramGroupResponse, TelegramGroupByTelegramIdResponse,
} from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { TelegramGuard } from '../../../common/guards/telegram/telegram.guard';
import { TelegramGroupByIdPipe } from '../../../common/pipes/telegram-group-by-id.pipe';
import { GroupByIdPipe } from '../../../common/pipes/group-by-id.pipe';
import { TelegramGroupService } from './telegram-group.service';
import { TelegramGroupDocumentation } from '../../../common/documentation/modules/v2/telegram-group';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DbTelegramGroup } from '../../../database/v2/entities/telegram-group.entity';

@ApiTags('TelegramGroup')
@Controller({
  version: '2',
  path: '/telegramGroups',
})
export class TelegramGroupController {
  constructor (
    private telegramGroupService: TelegramGroupService,
    @InjectMapper() private mapper: Mapper,
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
    return this.mapper.map(telegramGroup, DbTelegramGroup, TelegramGroupResponse);
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
    return this.mapper.map(telegramGroup, DbTelegramGroup, TelegramGroupResponse);
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
    return this.mapper.map(telegramGroup, DbTelegramGroup, TelegramGroupResponse);
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
    const mappedTelegramGroups = this.mapper.mapArray(telegramGroups, DbTelegramGroup, TelegramGroupResponse);

    return { telegramGroups: mappedTelegramGroups };
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
    const mappedTelegramGroups = this.mapper.mapArray(telegramGroups, DbTelegramGroup, TelegramGroupByTelegramIdResponse);
    return { telegramGroups: mappedTelegramGroups };
  }
}
