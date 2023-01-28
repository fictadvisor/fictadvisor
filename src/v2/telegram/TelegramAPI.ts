import {TelegramConfigService} from "../config/TelegramConfigService";
import {Injectable} from "@nestjs/common";
import axios, {AxiosInstance} from "axios";
import {VerifyStudentDTO} from "./dto/VerifyStudentDTO";
import {VerifyCaptainDTO} from "./dto/VerifyCaptainDTO";
import {VerifySuperheroDTO} from "./dto/VerifySuperheroDTO";

@Injectable()
export class TelegramAPI {
  private client:AxiosInstance;

  constructor(
    private telegramConfig: TelegramConfigService,
  ) {
    this.client = axios.create({
      baseURL: this.telegramConfig.apiUrl,
      headers: {
        Authorization: `Bearer ${this.telegramConfig.botToken}`,
      },
    });
  }

  async verifyStudent(data:VerifyStudentDTO) {
    await this.client.post('/students/broadcastPending', data);
  }

  async verifyCaptain(data:VerifyCaptainDTO) {
    await this.client.post('/captains/broadcastPending', data);
  }

  async verifySuperhero(data:VerifySuperheroDTO) {
    await this.client.post('/superheroes/broadcastPending', data);
  }
}