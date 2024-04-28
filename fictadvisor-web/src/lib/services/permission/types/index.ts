import { PERMISSION } from '@fictadvisor/utils/security';

export type PermissionResponse = {
  [key in PERMISSION]: boolean;
};
