import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Avatar, Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import userAPI from '@/lib/api/user/UserAPI';
import theme from '@/styles/theme';

import AvatarDropzone from './components/avatar-dropzone';
import * as styles from './ChangeAvatarWindow.styles';

interface ChangeAvatarWindowProps {
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

const ChangeAvatarWindow: FC<ChangeAvatarWindowProps> = ({
  setPopupOpen,
  userId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState('');
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('mobileMedium'));
  const buttonSize = isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM;

  const handleAvatarChange = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        await userAPI.changeAvatar(userId, formData);
        toast.success('Аватарка успішно змінена!', '', 1000);
        setTimeout(() => {
          router.reload();
        }, 1000);
      } catch (error) {
        toastError.displayError(error);
      }
    }
    setPopupOpen(false);
  };

  return (
    <Popup
      onClose={() => setPopupOpen(false)}
      open
      hasCross
      title={'Змінити аватар'}
      content={
        <>
          {file ? (
            <Box sx={styles.avatarWrapper}>
              <Avatar sx={styles.avatar} src={avatarURL} alt="Аватар" />
            </Box>
          ) : (
            <AvatarDropzone setFile={setFile} setAvatarURL={setAvatarURL} />
          )}
        </>
      }
      sx={styles.wrapper}
      firstButton={
        <Box>
          {file && (
            <Button
              text={'Скасувати'}
              size={buttonSize}
              color={ButtonColor.SECONDARY}
              variant={ButtonVariant.OUTLINE}
              sx={styles.button}
              onClick={() => setPopupOpen(false)}
            />
          )}
        </Box>
      }
      secondButton={
        <Box>
          {file && (
            <Button
              text={'Завантажити'}
              size={buttonSize}
              variant={ButtonVariant.FILLED}
              sx={styles.button}
              onClick={handleAvatarChange}
            />
          )}
        </Box>
      }
    />
  );
};

export default ChangeAvatarWindow;
