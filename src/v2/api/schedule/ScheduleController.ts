import { Controller } from '@nestjs/common';
import { ScheduleService } from './ScheduleService';

@Controller({
  version: '2',
  path: '/schedule'
})
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
  ) {}


}