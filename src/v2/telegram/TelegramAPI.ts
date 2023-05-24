import { TelegramConfigService } from '../config/TelegramConfigService';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { VerifyStudentDTO } from '../api/dtos/VerifyStudentDTO';
import { VerifyCaptainDTO } from '../api/dtos/VerifyCaptainDTO';
import { VerifySuperheroDTO } from '../api/dtos/VerifySuperheroDTO';
import { VerifyResponseDTO } from '../api/dtos/VerifyResponseDTO';

@Injectable()
export class TelegramAPI {
  private client:AxiosInstance;

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
}