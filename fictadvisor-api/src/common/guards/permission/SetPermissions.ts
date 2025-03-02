import { SetMetadata } from '@nestjs/common';

export const SetPermissions = (permissions: string | string[]) =>
  SetMetadata('permissions', typeof permissions === 'string' ? [permissions] : permissions);
