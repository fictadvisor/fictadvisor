import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { NextFunction, Request, Response } from 'express';
import { timingSafeEqual } from 'crypto';
import { EMAIL_QUEUE } from '../email/email.constants';
import { PARSE_QUEUE } from '../parser/v2/parse-queue.constants';
import { QUEUES_ENABLED } from './queue.module';

// Where the dashboard lives on the API itself: https://api.ficeadvisor.com/queues on
// prod, https://apidev.ficeadvisor.com/queues on dev. Mounting it in the API rather than
// running a second container is what makes it follow the queues around: it reads the
// same Redis, through the same QUEUE_PREFIX and database index, as the process that
// actually owns them, so dev and prod each see their own jobs with nothing to configure.
export const BULL_BOARD_ROUTE = '/queues';

// Both queues, in the order they matter operationally.
const QUEUE_NAMES = [PARSE_QUEUE, EMAIL_QUEUE];

const logger = new Logger('BullBoard');

// The board is an Express router, not a Nest controller, so it never reaches the guards
// the rest of the API is protected by -- and it can retry, promote and delete jobs. It
// is therefore gated on its own credentials, and mounted ONLY when they are set: an
// environment that forgets BULL_BOARD_PASSWORD gets no dashboard rather than an open one.
export const applyBullBoard = (app: NestExpressApplication) => {
  const username = process.env.BULL_BOARD_USER || 'admin';
  const password = process.env.BULL_BOARD_PASSWORD;

  if (!QUEUES_ENABLED) {
    // No REDIS_URL means no queues were registered at all (see QueueModule) and there is
    // nothing for the board to show. This is the normal state of a local checkout.
    return;
  }

  if (!password) {
    logger.warn(
      `BULL_BOARD_PASSWORD is not set, so ${BULL_BOARD_ROUTE} is not mounted`,
    );
    return;
  }

  const queues = QUEUE_NAMES.map(
    (name) => app.get<Queue>(getQueueToken(name), { strict: false }),
  );

  const serverAdapter = new ExpressAdapter().setBasePath(BULL_BOARD_ROUTE);
  createBullBoard({
    queues: queues.map((queue) => new BullMQAdapter(queue)),
    serverAdapter,
    options: {
      uiConfig: { boardTitle: 'FICE ADVISOR' },
    },
  });

  app.use(BULL_BOARD_ROUTE, basicAuth(username, password), serverAdapter.getRouter());

  logger.log(`Serving the queue dashboard on ${BULL_BOARD_ROUTE}`);
};

// Basic auth rather than an app JWT on purpose: this is an operator's tool, like Grafana,
// and its credentials should not depend on the user table it can be used to email.
const basicAuth = (username: string, password: string) => {
  const expected = Buffer.from(
    `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  );

  return (req: Request, res: Response, next: NextFunction) => {
    const provided = Buffer.from(req.headers.authorization ?? '');

    // timingSafeEqual throws on a length mismatch, so the lengths are compared first --
    // which leaks only how long the header was, not what was in it.
    if (
      provided.length === expected.length &&
      timingSafeEqual(provided, expected)
    ) {
      return next();
    }

    res.setHeader('WWW-Authenticate', 'Basic realm="FICE ADVISOR queues", charset="UTF-8"');
    res.status(401).send('Unauthorized');
  };
};
