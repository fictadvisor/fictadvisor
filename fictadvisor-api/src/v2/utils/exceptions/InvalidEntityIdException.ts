import { InvalidEntityByException } from './InvalidEntityByException';

export class InvalidEntityIdException extends InvalidEntityByException {
  constructor (entity: string) {
    super(entity, 'id');
  }
}
