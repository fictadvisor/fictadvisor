import { type Request } from 'express';

export class RequestUtils {
  static get (req: Request, value: string) {
    return req.query[value] ?? req.params[value] ?? req.body[value] ?? '';
  }
}
