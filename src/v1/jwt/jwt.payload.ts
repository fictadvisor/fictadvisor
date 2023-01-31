import { type UserRole } from 'src/v1/database/entities/user.entity';

export interface JwtPayload {
  sub: string
  username: string
  role: UserRole
}
