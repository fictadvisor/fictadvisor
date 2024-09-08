import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import SelectiveBlock from '@/app/(main)/account/components/selective-tab/components/selective-block';
import useAuthentication from '@/hooks/use-authentication';
import UserAPI from '@/lib/api/user/UserAPI';

import * as styles from './SelectiveTab.styles';

const SelectiveTab: FC = () => {
  const { user } = useAuthentication();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['selectiveDisciplines', user.id],
    queryFn: () => UserAPI.getSelectiveDisciplinesBySemester(user.id),
    refetchOnWindowFocus: false,
    enabled: !!user.id,
  });

  const [openedBlocksNum, setOpenedBlockNum] = useState(0);

  const changeOpenedBlockNum = (num: number) => {
    setOpenedBlockNum(openedBlocksNum + num);
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography component="h4" sx={styles.title}>
        Мої вибіркові
      </Typography>
      {openedBlocksNum > 0 && (
        <Typography sx={styles.description}>
          За допомогою цієї сторінки ти можеш налаштувати викладачів, що будуть
          доступні в опитуванні. Ця сторінка не є вибірковим, які проводить КПІ,
          тому обирайте ті предмети на які потрапили
        </Typography>
      )}
      {data ? (
        <>
          {data.selectives.map((selective, index) => (
            <SelectiveBlock
              key={index}
              userId={user.id}
              semester={selective.semester as 1 | 2}
              year={selective.year}
              disciplines={selective.disciplines}
              disciplinesNumber={selective.amount}
              refetch={refetch}
              onOpenBlock={changeOpenedBlockNum}
            />
          ))}
        </>
      ) : (
        !isLoading && (
          <Box sx={styles.noData}>
            <Typography variant="h6">
              В тебе на цьому курсі немає вибіркових
            </Typography>
            <Image src="/icons/frog.svg" alt="Жаба" width={200} height={200} />
          </Box>
        )
      )}
    </Box>
  );
};

export default SelectiveTab;
