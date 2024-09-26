export class GoogleDate {
  dateTime: string;
  timeZone: string;
}

export class EventResource {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  start: GoogleDate;
  end: GoogleDate;
  visibility: string;
  recurrence?: string[];
  originalStartTime?: string;
  recurringEventId?: string;
}
