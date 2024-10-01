import { Request } from 'express';
import { User } from '@prisma/client';

export class RequestUtils {
  static get (req: Request, value: string) {
    return req.query[value] ?? req.params[value] ?? req.body[value] ?? '';
  }

  static cookies (field: string)  {
    return ((req: Request) => req.cookies?.[field]);
  };
}

export type ReqWithUser = Request & { user: User };
