import React, {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Box, Typography, useMediaQuery } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { handleFileSelect } from '@/components/pages/account-page/components/general-tab/components/change-avatar-window/components/avatar-dropzone/utils/handleFileSelect';
import useToast from '@/hooks/use-toast';
import theme from '@/styles/theme';

import * as styles from './AvatarDropzone.styles';

interface AvatarDropzoneProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  setAvatarURL: Dispatch<SetStateAction<string>>;
}

const AvatarDropzone: FC<AvatarDropzoneProps> = ({ setFile, setAvatarURL }) => {
  const [isDragging, setIsDragging] = useState(false);
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDropOrFileChange = (
    event: DragEvent | ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setIsDragging(false);

    const file =
      'dataTransfer' in event
        ? event.dataTransfer.files[0]
        : event.target.files && event.target.files[0];

    if (file) {
      handleFileSelect(file, toast, setFile, setAvatarURL);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('mobileMedium'));

  return (
    <>
      {isMobile ? (
        <>
          <Button
            text={'Обери файл'}
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.FILLED}
            sx={styles.button}
            onClick={openFileInput}
          />
          <input
            style={styles.input}
            ref={fileInputRef}
            accept=".png, .jpg, .jpeg, .webp"
            type="file"
            onChange={handleDropOrFileChange}
          />
        </>
      ) : (
        <Box
          sx={styles.wrapper(isDragging)}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={event => event.preventDefault()}
          onDrop={handleDropOrFileChange}
        >
          <ArrowDownTrayIcon />
          <Typography variant="h6Bold">Перетягни сюди</Typography>
          <Typography variant="body2Medium">або</Typography>
          <Button
            text={'Обери файл'}
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.FILLED}
            sx={styles.button}
            onClick={openFileInput}
          />
          <input
            ref={fileInputRef}
            accept=".png, .jpg, .jpeg, .webp"
            type="file"
            style={styles.input}
            onChange={handleDropOrFileChange}
          />
        </Box>
      )}
    </>
  );
};

export default AvatarDropzone;
