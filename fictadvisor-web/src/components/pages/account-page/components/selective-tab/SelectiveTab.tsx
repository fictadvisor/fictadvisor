import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import SelectiveBlock from '@/components/pages/account-page/components/selective-tab/components/selective-block';
import useAuthentication from '@/hooks/use-authentication';
import UserAPI from '@/lib/api/user/UserAPI';

import * as styles from './SelectiveTab.styles';

const SelectiveTab: FC = () => {
  const { user } = useAuthentication();

  const { data, refetch, isLoading } = useQuery(
    ['selectiveDisciplines', user.id],
    () => UserAPI.getSelectiveDisciplinesBySemester(user.id),
    {
      refetchOnWindowFocus: false,
    },
  );

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
          {data.selective.map((selective, index) => (
            <SelectiveBlock
              key={index}
              userId={user.id}
              semester={selective.semester}
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
