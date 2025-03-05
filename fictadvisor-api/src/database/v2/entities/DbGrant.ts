import { Grant, Role } from '@prisma/client/fictadvisor';

export type DbGrant = Grant & {
  role: Role
}
