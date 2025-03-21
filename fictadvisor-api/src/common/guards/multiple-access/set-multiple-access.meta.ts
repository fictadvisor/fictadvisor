import { SetMetadata } from '@nestjs/common';

export const SetMultipleAccess = (...guards: any | any[]) =>
  SetMetadata('multipleAccess', typeof guards === 'function' ? [guards] : guards);
