import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as process from 'node:process';
import { TelegramAPI } from '../../modules/telegram-api/TelegramAPI';
import { nonEmptyObject, formattedJson } from '../helpers/objectUtils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor (
    private configService: ConfigService,
    private telegramApi: TelegramAPI,
  ) {}

  async catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status, message;
    const error = exception.constructor.name;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object') {
        const { statusCode, ...errorMessage } = errorResponse as any;
        message = errorMessage;
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
      await this.logError(exception, ctx);
    }
  }

  private async logError (exception: Error, ctx: HttpArgumentsHost) {
    const req = ctx.getRequest<Request>();
    const { method, path } = req;
    const environment = process.env.NODE_ENV?.toUpperCase();
    const version = path.match(/\/v(.)\//)[1];
    const project = version === '1' ? 'COHORTA' : 'FICTADVISOR';
    const params = nonEmptyObject(req.params);
    const query = nonEmptyObject(req.query);
    const body = nonEmptyObject(req.body);
    const userId: string = (req.user as any)?.id;

    let errorMsg = '';
    errorMsg += `🚨🚨🚨 ${project} ERROR 🚨🚨🚨\n`;
    errorMsg += `⚙️ Environment: ${environment}\n`;
    errorMsg += `🌐 ${method} ${path}\n`;
    if (userId) errorMsg += `🆔 User ID: ${userId}\n`;
    if (params) errorMsg += `🔢 URL Params:\n${formattedJson(params)}\n`;
    if (query) errorMsg += `❓ Query Params:\n${formattedJson(query)}\n`;
    if (body) errorMsg += `📦 Request Body:\n${formattedJson(body)}\n`;
    errorMsg += `\n📜 Stack Trace:\n`;
    errorMsg += exception.stack;

    console.error(errorMsg);
    await this.telegramApi.sendMessage(errorMsg);
  }
}
