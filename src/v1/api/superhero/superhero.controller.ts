import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { type Page } from 'src/v1/common/common.api';
import { SearchableQueryDto } from 'src/v1/common/common.dto';
import { Authorize } from 'src/v1/security/security.authorization';
import { Context, SecurityContext } from 'src/v1/security/security.context';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { type SuperheroDto } from './dto/superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { SuperheroService } from './superhero.service';

@Controller('superheroes')
export class SuperheroController {
  constructor (private readonly superheroService: SuperheroService) {}

  @Get('/me')
  @Authorize()
  async getMe (@Context() ctx: SecurityContext): Promise<SuperheroDto> {
    return await this.superheroService.getSuperhero(ctx.user);
  }

  @Get()
  async getSuperheroes (
    @Query() query: SearchableQueryDto
  ): Promise<Page<SuperheroDto>> {
    return await this.superheroService.getSuperheroes(query);
  }

  @Post()
  @Authorize()
  public async createSuperhero (
  @Context() ctx: SecurityContext,
    @Body() body: CreateSuperheroDto
  ) {
    return await this.superheroService.createSuperhero(ctx.user, body);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  async updateSuperhero (
    @Param('id') id: string,
      @Body() body: UpdateSuperheroDto
  ): Promise<SuperheroDto> {
    return await this.superheroService.updateSuperhero(id, body);
  }
}
