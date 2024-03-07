import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Avatar, Box } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';

import AvatarDropzone from './components/avatar-dropzone';
import * as styles from './ChangeAvatar.styles';

interface ChangeAvatarProps {
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
  setAvatarUrl: Dispatch<SetStateAction<string>>;
}

const ChangeAvatar: FC<ChangeAvatarProps> = ({
  setPopupOpen,
  setAvatarUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState('');

  const handleAvatarChange = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      setAvatarUrl(avatarURL);
    }
    setPopupOpen(false);
  };

  return (
    <Popup
      onClose={() => setPopupOpen(false)}
      open
      hasCross
      title="Змінити аватар"
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
              text="Скасувати"
              size={ButtonSize.MEDIUM}
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
              text="Завантажити"
              size={ButtonSize.MEDIUM}
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

export default ChangeAvatar;
