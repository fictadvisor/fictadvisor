import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export class InvalidBodyException extends HttpException {
  constructor (errors: string[]) {
    super({ messages: errors }, HttpStatus.BAD_REQUEST);
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor (private configService: ConfigService) {}

  catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status, message;
    const error = exception.constructor.name;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object') {
        const { statusCode, ...errorMessage } = errorResponse as any;
        message = errorMessage;
        status = statusCode;
      } else {
        message = { message: errorResponse };
      }

      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'An error occurred on the server side' };
    }

    const requestResponse = {
      status,
      timestamp: new Date().toISOString(),
      error,
      ...message,
    };

    res.status(status).json(requestResponse);

    if (this.configService.get<string>('logLevel') === 'debug') {
      console.debug('Resolved an exception', {
        status,
        response: JSON.stringify(requestResponse),
      });
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {

      console.error(exception.stack);
    }
  }
}

const flattenValidationErrors = (errors: ValidationError[], parent = 'obj'): string[] => {
  const results = [];

  for (const { property, constraints, children } of errors) {
    if (constraints) {
      results.push(...Object.values(constraints).map((c) => `${parent}.${property}: ${c}`));
    }
    if (children.length !== 0) {
      results.push(...flattenValidationErrors(children, `${parent}.${property}`));
    }
  }

  return results;
};

export const validationExceptionFactory = () => (errors: ValidationError[]) => {
  return new InvalidBodyException(flattenValidationErrors(errors));
};
