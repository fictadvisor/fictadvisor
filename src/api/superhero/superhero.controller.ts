import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { Authorize } from 'src/security/security.authorization';
import { Context, SecurityContext } from 'src/security/security.context';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroDto } from './dto/superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { SuperheroService } from './superhero.service';

@Controller('superheroes')
export class SuperheroController {
  constructor(private superheroService: SuperheroService) {}

  @Get('/me')
  @Authorize()
  getMe(@Context() ctx: SecurityContext): Promise<SuperheroDto> {
    return this.superheroService.getSuperhero(ctx.user);
  }

  @Get()
  getSuperheroes(
    @Query() query: SearchableQueryDto
  ): Promise<Page<SuperheroDto>> {
    return this.superheroService.getSuperheroes(query);
  }

  @Post()
  @Authorize()
  public createSuperhero(
    @Context() ctx: SecurityContext,
    @Body() body: CreateSuperheroDto
  ) {
    return this.superheroService.createSuperhero(ctx.user, body);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  updateSuperhero(
    @Param('id') id: string,
    @Body() body: UpdateSuperheroDto
  ): Promise<SuperheroDto> {
    return this.superheroService.updateSuperhero(id, body);
  }
}
