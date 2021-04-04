import { UserRole } from "src/database/entities/user.entity";

export interface JwtPayload {
  sub: string;
  username: string;
  role: UserRole;
};
