import { InvalidEntityByException } from './InvalidEntityByException';

export class InvalidEntitySlugException extends InvalidEntityByException {
  constructor (entity: string) {
    super(entity, 'slug');
  }
}
