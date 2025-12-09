'use client';
import { use, useEffect } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import * as styles from '@/app/(auth)/register/email-verification/[token]/VerifyEmailTokenPage.styles';
import Progress from '@/components/common/ui/progress';
import useToast from '@/hooks/use-toast';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import { setAuthTokens } from '@/lib/api/auth/ServerAuthApi';
interface VerifyEmailTokenPageProps {
  params: Promise<{
    token: string;
  }>;
}
const VerifyEmailTokenPage = ({
  params,
}: VerifyEmailTokenPageProps) => {
  const { token } = use(params);
  const router = useRouter();

  const toast = useToast();

  const { data, error } = useQuery({
    queryKey: ['verifyEmailToken', token],
    queryFn: () => AuthAPI.verifyEmailToken(token),
    retry: 2,
  });

  if (error) {
    if (
      isAxiosError(error) &&
      error.response?.data.error === 'AlreadyRegisteredException'
    ) {
      toast.error('Цей токен вже активований', 'Увійди у свій акаунт');
      router.push(`/login`);
    } else {
      toast.error('Лист реєстрації вже не дійсний', 'Пройди реєстрацію знов!');
      router.push(`/register`);
    }
  }

  useEffect(() => {
    if (data) {
      setAuthTokens(data)
        .then(() => {
          toast.success('Ваш аккаунт успішно активовано');
        })
        .catch(() => {
          toast.error('Помилка при активації аккаунта');
        })
        .finally(() => {
          router.push('/');
        });
    }
  }, [data]);

  return (
    <Box sx={styles.box}>
      <Progress />
    </Box>
  );
};

export default VerifyEmailTokenPage;
