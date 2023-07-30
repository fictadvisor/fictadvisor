import axios from 'axios';
import * as process from 'process';

const ADMISSION_BOT_API = process.env.ADMISSION_BOT_API;
const ADMISSION_BOT_TOKEN = process.env.ADMISSION_BOT_TOKEN;

export class AdmissionAPI {
  static async sendMessage (id: bigint, text: string, parseMode: 'HTML' | 'Markdown' = undefined) {
    await axios.post(`${ADMISSION_BOT_API}/sendMessage`, {}, {
      params: {
        uid: id,
        text,
        parse_mode: parseMode,
      },
      headers: {
        Authorization: `Bearer ${ADMISSION_BOT_TOKEN}`,
      },
    });
  }
}