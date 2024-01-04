import { Dispatch, SetStateAction } from 'react';

import { isValidFile } from '@/components/pages/account-page/components/general-tab/utils/isValidFile';
import { UseToastReturn } from '@/hooks/use-toast/types';

export const handleFileSelect = (
  file: File,
  toast: UseToastReturn,
  setFile: Dispatch<SetStateAction<File | null>>,
  setAvatarURL: Dispatch<SetStateAction<string>>,
) => {
  if (!isValidFile(file)) {
    toast.error(
      'Invalid file extension',
      'Supported file extensions: .png, .jpg, .jpeg, .webp',
      4000,
    );
    return;
  }

  if (file.size > 1.5 * 1024 * 1024) {
    toast.error('Розмір файлу не повинен бути більше 1.5 МБ', '', 4000);
    return;
  }

  const reader = new FileReader();
  reader.onload = (event: ProgressEvent<FileReader>) => {
    if (event.target) {
      const result = event.target.result;
      if (typeof result === 'string') {
        setAvatarURL(result);
      }
    }
  };
  reader.readAsDataURL(file);
  setFile(file);
};
