import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui/Button';
import { ButtonVariant } from '@/components/common/ui/button-mui/types';

import * as styles from './AnswerSaved.style';

const AnswersSaved = () => {
  const router = useRouter();

  return (
    <Box sx={styles.savedWrapper}>
      <Box sx={styles.content}>
        <Image src="/gifs/frogging.gif" alt="frog" width={90} height={90} />
        <Typography variant="h1" sx={styles.heading}>
          Дякуємо за відповіді!
        </Typography>
        <Typography sx={styles.paragraph}>
          Твої відповіді допоможуть покращити якість навчання на нашому
          факультеті. Також ти можеш оцінити інших викладачів.
        </Typography>
        <Box sx={styles.buttons}>
          <Button
            sx={styles.button}
            text={'Пройти нове опитування'}
            type="submit"
            onClick={() => router.push('/poll')}
          />
          <Button
            sx={styles.button}
            text={'Повернутись на головну'}
            type="submit"
            variant={ButtonVariant.OUTLINE}
            onClick={() => router.push('/')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AnswersSaved;
