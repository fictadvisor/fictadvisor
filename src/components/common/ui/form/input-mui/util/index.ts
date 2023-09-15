import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import {
  InputState,
  InputType,
} from '@/components/common/ui/form/input-mui/types';

export const getState = (
  disabled?: boolean,
  isTouched?: boolean,
  isError?: boolean,
  isSuccessOnDefault?: boolean,
  readOnly?: boolean,
): InputState => {
  if (disabled) return InputState.DISABLED;
  if (readOnly) return InputState.READONLY;
  else if (isTouched && isError) return InputState.ERROR;
  else if (isTouched && isSuccessOnDefault) return InputState.SUCCESS;
  else return InputState.DEFAULT;
};

export const getRightIcon = (
  type: InputType,
  isHidden: boolean,
  state: InputState,
  value: string,
) => {
  if (type === InputType.PASSWORD) {
    return isHidden ? EyeSlashIcon : EyeIcon;
  } else {
    if (state === InputState.SUCCESS) return CheckCircleIcon;
    else if (state === InputState.ERROR) return ExclamationCircleIcon;
    else if (type === InputType.SEARCH && value) return XMarkIcon;
  }
};
