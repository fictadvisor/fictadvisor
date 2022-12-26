import { Controller } from '@nestjs/common';
import { PollService } from './PollService';

@Controller({
  version: '2',
  path: '/poll'
})
export class PollController {
  constructor(
    private pollService: PollService,
  ) {}


}