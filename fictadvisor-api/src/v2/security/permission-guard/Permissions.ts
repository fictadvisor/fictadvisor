import { SetMetadata } from '@nestjs/common';

export const Permissions = (permissions: string | string[]) =>
  SetMetadata('permissions', typeof permissions === 'string' ? [permissions] : permissions);