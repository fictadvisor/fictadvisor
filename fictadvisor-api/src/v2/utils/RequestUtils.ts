import { Request } from 'express';

export class RequestUtils {
  static get (req: Request, value: string) {
    return req.query[value] ?? req.params[value] ?? req.body[value] ?? '';
  }

  static cookies (field: string)  {
    return ((req: Request) => req.cookies?.[field]);
  };
}

