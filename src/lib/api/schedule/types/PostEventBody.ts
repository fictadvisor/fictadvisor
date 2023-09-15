import { SharedEventBody } from './shared';

export interface PostEventBody extends Required<SharedEventBody> {
  groupId: string;
}
