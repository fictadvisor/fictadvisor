import { Injectable, PipeTransform } from '@nestjs/common';
import { EventRepository } from '../../database/v2/repositories/event.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class EventByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private eventRepository: EventRepository,
  ) {}
  async transform (id: string) {
    const event = await this.eventRepository.findOne({ id });
    if (!event) {
      throw new InvalidEntityIdException('Event');
    }
    return id;
  }
}
