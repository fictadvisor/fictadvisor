import { Grant, Role } from '@prisma/client';

export type DbGrant = Grant & {
  role: Role
}