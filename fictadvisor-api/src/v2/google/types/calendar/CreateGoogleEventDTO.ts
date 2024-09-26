import { GoogleDate } from './resources/EventResource';

export class CreateGoogleEventDTO {
  start: GoogleDate;
  end: GoogleDate;
  id?: string;
  location?: string;
  summary?: string;
  visibility?: string;
  description?: string;
  colorId?: string;
  recurrence?: string[];
}
