import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { VerifyStudentDTO } from './types/VerifyStudentDTO';
import { VerifyCaptainDTO } from './types/VerifyCaptainDTO';
import { VerifyResponseDTO } from './types/VerifyResponseDTO';
import { TelegramConfigService } from '../../config/TelegramConfigService';

@Injectable()
export class TelegramAPI {
  private client: AxiosInstance;

  constructor (
    private telegramConfig: TelegramConfigService,
  ) {
    this.client = axios.create({
      baseURL: this.telegramConfig.apiUrl,
      headers: {
        Authorization: `Bearer ${this.telegramConfig.botToken}`,
      },
    });
    this.client.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        throw new HttpException(error.response.statusText, error.response.status);
      }
    );
  }

  async verifyStudent (data:VerifyStudentDTO) {
    await this.client.post('/students/broadcastPending', data);
  }

  async verifyCaptain (data:VerifyCaptainDTO) {
    await this.client.post('/captains/broadcastPending', data);
  }

  async verifyResponse (data:VerifyResponseDTO) {
    await this.client.post('/responses/broadcastPending', data);
  }

  async sendMessage (text: string, chatId?: string) {
    await this.client.post('/broadcast/sendMessage', {
      text,
    }, {
      params: {
        parse_mode: 'HTML',
        id: chatId,
      },
    });
  }

  async error (text: string, chatId?: string) {
    await this.client.post('/broadcast/error', {
      text,
    }, {
      params: {
        parse_mode: 'HTML',
        id: chatId,
      },
    });
  }
}
