import { Request } from 'express';

export class RequestUtil {
  static get (req: Request, value: string) {
    // Express 5 leaves req.body undefined on bodyless requests (GET), where
    // Express 4 used {}. Optional-chain so resolving a placeholder absent from
    // query/params doesn't throw on req.body[value].
    return req.query?.[value] ?? req.params?.[value] ?? req.body?.[value] ?? '';
  }
}

