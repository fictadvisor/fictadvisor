import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { GrantService } from '../services/GrantService';
import { UpdateGrantDTO } from '../dtos/UpdateGrantDTO';
import { GrantMapper } from '../../mappers/GrantMapper';

@Controller({
  version: '2',
  path: '/grants',
})
export class GrantController {
  constructor (
    private grantService: GrantService,
    private grantMapper: GrantMapper,
  ) {}

  @Delete('/:grantId')
  async delete (
    @Param('grantId') grantId: string,
  ) {
    const grant = await this.grantService.delete(grantId);
    return this.grantMapper.delete(grant);
  }

  @Patch('/:grantId')
  async update (
    @Param('grantId') grantId: string,
    @Body() body: UpdateGrantDTO,
  ) {
    const grant = await this.grantService.update(grantId, body);
    return this.grantMapper.update(grant);
  }
}