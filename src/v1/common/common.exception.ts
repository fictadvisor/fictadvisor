import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  type ValidationError,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Response } from 'express';
import { iterate } from 'iterare';
import { Logger, SystemLogger } from 'src/v1/logger/logger.core';

export interface ServiceExceptionPayload {
  message: string
  details?: string[]
}

export class ServiceException extends HttpException {
  static create (status: HttpStatus, payload: ServiceExceptionPayload | string) {
    if (typeof payload === 'string') {
      payload = { message: payload };
    }

    return new ServiceException({ status, ...payload }, status);
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  @Logger('system')
  private readonly logger: SystemLogger;

  constructor (private readonly configService: ConfigService) {}

  catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status, message;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

      message =
        exception instanceof ServiceException
          ? errorResponse
          : typeof errorResponse === 'string'
            ? errorResponse
            : (errorResponse as any).message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    const requestResponse = {
      status,
      timestamp: new Date().toISOString(),
      ...(typeof message === 'object' ? message : { message }),
    };

    res.status(status).json(requestResponse);

    if (this.configService.get<string>('logLevel') == 'debug') {
      this.logger.debug('Resolved an exception', {
        status,
        response: JSON.stringify(requestResponse),
      });
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception.stack);
    }
  }
}

const prependConstraintsWithParentProp = (
  parentError: ValidationError,
  error: ValidationError
) => {
  const constraints = {};

  for (const key in error.constraints) {
    constraints[key] = `${parentError.property}.${error.constraints[key]}`;
  }

  return {
    ...error,
    constraints,
  };
};

const mapChildrenToValidationErrors = (error: ValidationError) => {
  if (!(error.children && (error.children.length > 0))) {
    return [error];
  }

  const validationErrors = [];

  for (const item of error.children) {
    if (item.children && (item.children.length > 0)) {
      validationErrors.push(...mapChildrenToValidationErrors(item));
    }

    validationErrors.push(prependConstraintsWithParentProp(error, item));
  }

  return validationErrors;
};

const flattenValidationErrors = (errors: ValidationError[]): string[] => {
  return iterate(errors)
    .map((error) => mapChildrenToValidationErrors(error))
    .flatten()
    .filter((item) => !!item.constraints)
    .map((item) => Object.values(item.constraints))
    .flatten()
    .toArray() as string[];
};

export const validationExceptionFactory = () => (errors: ValidationError[]) => {
  return ServiceException.create(HttpStatus.BAD_REQUEST, {
    message: 'Invalid request',
    details: flattenValidationErrors(errors),
  });
};
