import { createLogger, transports, format, Logger as SystemLogger } from 'winston';

const loggerFormat = format.combine(
  format.timestamp(),
  format.simple(),
);

const loggers = {};

export const getLogger = (source = 'system'): SystemLogger => {
  if (loggers[source]) {
    return loggers[source];
  }

  const logger = createLogger({
    level: process.env.LOG_LEVEL ?? 'info',
    format: format.json(),
    defaultMeta: { source },
    transports: [
      new transports.Console({ format: loggerFormat }),
    ],
  });

  loggers[source] = logger;

  return logger;
};

export { SystemLogger };

export function Logger(source?: string): any {
  return (
    target: unknown,
    propertyKey: string | symbol
  ): any => {
    target[propertyKey] = getLogger(source ?? target.constructor.name);
  }
};

export const systemLogger = getLogger('system');
