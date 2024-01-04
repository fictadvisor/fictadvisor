import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateQueueDTO } from '../dtos/CreateQueueDTO';
import { UpdateQueueDTO } from '../dtos/UpdateQueueDTO';
import { CreateQueueUserDTO } from '../dtos/CreateQueueUserDTO';
import { UpdateQueueUserDTO } from '../dtos/UpdateQueueUserDTO';
import { CreateEntrantDTO } from '../dtos/CreateEntrantDTO';
import { Page } from '../../utils/QueryAllDTO';
import { AdmissionService } from '../services/AdmissionService';

@Controller({
  version: '2',
  path: '/admission',
})
export class AdmissionController {
  constructor (
    private admissionService: AdmissionService,
  ) {}

  @Post('/queues')
  createQueue (
    @Body() body: CreateQueueDTO,
  ) {
    return this.admissionService.createQueue(body);
  }

  @Get('/queues')
  getQueues () {
    return this.admissionService.getQueues();
  }

  @Get('/queues/:queueId')
  getQueue (
    @Param('queueId', ParseIntPipe) queueId: number,
  ) {
    return this.admissionService.getQueue(queueId);
  }

  @Patch('/queues/:queueId')
  updateQueue (
    @Body() body: UpdateQueueDTO,
    @Param('queueId', ParseIntPipe) queueId: number,
  ) {
    return this.admissionService.updateQueue(queueId, body);
  }

  @Delete('/queues/:queueId')
  deleteQueue (
    @Param('queueId', ParseIntPipe) queueId: number,
  ) {
    return this.admissionService.deleteQueue(queueId);
  }

  @Post('/queues/:queueId/advance')
  advanceQueue (
    @Param('queueId', ParseIntPipe) queueId: number,
  ) {
    return this.admissionService.advanceQueue(queueId);
  }

  @Get('/queues/:queueId/users')
  getQueueUsers (
    @Param('queueId', ParseIntPipe) queueId: number,
    @Query() query: Page,
  ) {
    return this.admissionService.getQueueUsers(queueId, query);
  }

  @Post('/queues/:queueId/users')
  createQueueUser (
    @Body() body: CreateQueueUserDTO,
    @Param('queueId', ParseIntPipe) queueId: number,
  ) {
    return this.admissionService.createQueueUser(queueId, body);
  }

  @Delete('/queues/:queueId/users/:userId')
  removeQueueUser (
    @Param('queueId', ParseIntPipe) queueId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.admissionService.deleteQueuePosition(queueId, userId);
  }

  @Patch('/queues/:queueId/users/:userId')
  updateQueueUser (
    @Body() body: UpdateQueueUserDTO,
    @Param('queueId', ParseIntPipe) queueId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.admissionService.updateQueueUser(queueId, userId, body);
  }

  @Get('/queues/:queueId/users/:userId')
  getQueueUser (
    @Param('queueId', ParseIntPipe) queueId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.admissionService.getQueueUser(queueId, userId);
  }

  @Get('/users')
  getUsers (
    @Query() page: Page,
  ) {
    return this.admissionService.getUsers(page);
  }

  @Post('/users')
  createUser (
    @Body() body: CreateEntrantDTO,
  ) {
    return this.admissionService.createUser(body);
  }

  @Get('/users/:userId')
  getUser (
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.admissionService.getUser(userId);
  }
}
