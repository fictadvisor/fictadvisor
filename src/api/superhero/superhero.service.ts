import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable, SortableProcessor } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { ServiceException } from 'src/common/common.exception';
import { assign } from 'src/common/common.object';
import { Superhero, SuperheroState } from 'src/database/entities/superhero.entity';
import { User } from 'src/database/entities/user.entity';
import { Logger, SystemLogger } from 'src/logger/logger.core';
import { TelegramService } from 'src/telegram/telegram.service';
import { Repository } from 'typeorm';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroDto } from './dto/superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperheroService {
    @Logger()
    private logger: SystemLogger;

    constructor(
        private telegramService: TelegramService,
        @InjectRepository(Superhero)
        private superheroRepository: Repository<Superhero>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    private async findSuperhero(user: User, relations?: string[]) {
        const superhero = await this.superheroRepository.findOne({ user }, { relations });

        if (superhero == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, 'This user is not a superhero');
        }

        return superhero;
    }

    private superheroSortableProcessor = SortableProcessor.of<Superhero>({ year: ['ASC'], dorm: ['DESC'] }, 'year').fallback('name', 'ASC');

    public async getSuperheroes(query: SearchableQueryDto): Promise<Page<SuperheroDto>> {
        const [items, count] = await this.superheroRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: { 
                state: SuperheroState.APPROVED,
                ...Searchable.of<Superhero>('name', query.searchQuery).toQuery(),
            },
            order: { ...this.superheroSortableProcessor.toQuery(query.sort) },
            relations: ['user'],
        });

        return Page.of(
            count,
            items.map(r => SuperheroDto.from(r))
        );
    }

    public async getSuperhero(user: User): Promise<SuperheroDto> {
        return SuperheroDto.from(await this.findSuperhero(user, ['user']));
    }

    public async createSuperhero(user: User, dto: CreateSuperheroDto): Promise<SuperheroDto> {
        if (await this.superheroRepository.findOne({ user })) {
            throw ServiceException.create(HttpStatus.CONFLICT, 'You are already a superhero');
        }

        const superhero = await this.superheroRepository.save(
            assign(
                new Superhero(),
                {
                   user,
                   name: dto.name,
                   username: dto.username.replace(/[@]/g, ''),
                   dorm: dto.dorm,
                   year: dto.year,
                }
            )
        );

        this.telegramService.broadcastPendingSuperhero(superhero)
            .catch(e => this.logger.error('Failed to broadcast a pending superhero', { superhero: superhero.user.id, error: e.toString() }));

        return SuperheroDto.from(superhero);
    }

    async updateSuperhero(id: string, update: UpdateSuperheroDto): Promise<SuperheroDto> {
        const superhero = await this.findSuperhero(
            await this.userRepository.findOne({ id }), 
            ['user']
        );

        const previousState = superhero.state;

        if (update.state != null) { superhero.state = update.state; }

        if (superhero.state != previousState && previousState == SuperheroState.PENDING) {
            if (superhero.state == SuperheroState.APPROVED) {
                this.telegramService.broadcastApprovedSuperhero(superhero)
                    .catch(e => this.logger.error('Failed to broadcast an approved superhero', { user: superhero.user.id, error: e.toString() }));
            } else if (superhero.state == SuperheroState.HIDDEN) {
                this.telegramService.broadcastDeclinedSuperhero(superhero)
                    .catch(e => this.logger.error('Failed to broadcast a denied superhero', { user: superhero.user.id, error: e.toString() }));
            }
        }

        return SuperheroDto.from(
            await this.superheroRepository.save(superhero)
        );
    }

}
