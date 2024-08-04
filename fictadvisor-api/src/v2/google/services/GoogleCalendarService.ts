import { Injectable } from '@nestjs/common';
import { GoogleConfigService } from '../../config/GoogleConfigService';

@Injectable()
export class GoogleCalendarService {
  constructor (
    private config: GoogleConfigService,
  ) {}
}
