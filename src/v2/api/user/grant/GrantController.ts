import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { GrantService } from './GrantService';
import { UpdateGrantDTO } from './dto/UpdateGrantDTO';

@Controller({
  version: '2',
  path: '/grants',
})
export class GrantController {
  constructor (
    private readonly grantService: GrantService
  ) {}

  @Delete('/:grantId')
  async delete (
  @Param('grantId') grantId: string
  ) {
    await this.grantService.delete(grantId);
  }

  @Patch('/:grantId')
  async update (
  @Param('grantId') grantId: string,
    @Body() body: UpdateGrantDTO
  ) {
    await this.grantService.update(grantId, body);
  }
}
