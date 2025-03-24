import { Request } from 'express';

export class RequestUtil {
  static get (req: Request, value: string) {
    return req.query[value] ?? req.params[value] ?? req.body[value] ?? '';
  }
}

