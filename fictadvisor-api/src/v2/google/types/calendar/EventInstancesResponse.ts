import { EventResource } from './resources/EventResource';

export class EventInstancesResponse {
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  nextPageToken: string;
  nextSyncToken: string;
  items: EventResource[];
}
