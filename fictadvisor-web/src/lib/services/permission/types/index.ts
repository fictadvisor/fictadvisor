import { PERMISSION } from '@fictadvisor/utils/security';

export type PermissionResponse = {
  [value in PERMISSION]: boolean;
};
