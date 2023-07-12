import { Injectable, PipeTransform } from '@nestjs/common';
import { EventRepository } from '../../database/repositories/EventRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class EventByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private eventRepository: EventRepository
  ) {}
  async transform (eventId: string) {
    const event = this.eventRepository.findById(eventId);
    if (!event) {
      throw new InvalidEntityIdException('event');
    }
    return eventId;
  }
}