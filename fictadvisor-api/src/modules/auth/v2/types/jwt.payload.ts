export interface JwtPayload {
  sub: string;
  username: string | null;
  createdAt: number;
}