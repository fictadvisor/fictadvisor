import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  VerifyStudentDTO,
  VerifyCaptainDTO,
  VerifySuperheroDTO,
  VerifyResponseDTO,
} from '@fictadvisor/utils/requests';
import { TelegramConfigService } from '../config/TelegramConfigService';

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
  }

  async verifyStudent (data:VerifyStudentDTO) {
    await this.client.post('/students/broadcastPending', data);
  }

  async verifyCaptain (data:VerifyCaptainDTO) {
    await this.client.post('/captains/broadcastPending', data);
  }

  async verifySuperhero (data:VerifySuperheroDTO) {
    await this.client.post('/superheroes/broadcastPending', data);
  }

  async verifyResponse (data:VerifyResponseDTO) {
    await this.client.post('/responses/broadcastPending', data);
  }

  async sendMessage (text: string) {
    await this.client.post('/broadcast/sendMessage', {
      text,
    }, {
      params: {
        parse_mode: 'HTML',
      },
    });
  }
}
