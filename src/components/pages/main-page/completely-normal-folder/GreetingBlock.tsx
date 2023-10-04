import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import artem from '@/components/pages/main-page/completely-normal-folder/avatars/artem.png';
import danya from '@/components/pages/main-page/completely-normal-folder/avatars/danya.png';
import dima from '@/components/pages/main-page/completely-normal-folder/avatars/dima.png';
import illia from '@/components/pages/main-page/completely-normal-folder/avatars/illia.png';
import katya from '@/components/pages/main-page/completely-normal-folder/avatars/katya.png';
import oleg from '@/components/pages/main-page/completely-normal-folder/avatars/oleg.png';
import pasha from '@/components/pages/main-page/completely-normal-folder/avatars/pasha.png';
import sasha from '@/components/pages/main-page/completely-normal-folder/avatars/sasha.png';
import stas from '@/components/pages/main-page/completely-normal-folder/avatars/stas.png';
import svyat from '@/components/pages/main-page/completely-normal-folder/avatars/svyat.png';
import vovka from '@/components/pages/main-page/completely-normal-folder/avatars/vovka.png';
import * as styles from '@/components/pages/main-page/completely-normal-folder/GreetingBlock.styles';

import stylesCSS from './GreetingBlock.module.scss';

const GreetingBlock = () => {
  const avatars = [
    stas,
    svyat,
    oleg,
    danya,
    katya,
    pasha,
    dima,
    illia,
    vovka,
    artem,
    sasha,
  ];
  const names = [
    'Стасік',
    'Свят',
    'Олег',
    'Даня',
    'Катя',
    'Паша',
    'Діма',
    'Ілля',
    'Вова',
    'Артем',
    'Саша',
  ];

  const tags = [
    '@stbasarab',
    '@hoshion',
    '@fogoog',
    '@DanioRerio8',
    '@srebniukk',
    '@pseudo_otter',
    '@CyC_lik',
    '@K_Illya',
    '@vovka_yakor',
    '@artemiiiiiiiiiiiiiii',
    '@freakman_s',
  ];

  return (
    <Box sx={styles.greetingWrapper}>
      <Typography sx={styles.greetingTitle}>
        1000-ний коміт на Back-end
      </Typography>
      <Typography sx={styles.greetingSubtitle}>
        Вітаємо цих чудових котиків!!!
      </Typography>
      <Box sx={styles.kittensBlock}>
        {names.map((name, index) => (
          <Box key={index} sx={styles.kittenCard}>
            <Image
              className={stylesCSS['kitten-image']}
              width={200}
              height={200}
              src={avatars[index]}
              alt={name}
            />
            <Typography sx={styles.kittenName}>{name}</Typography>
            <Typography sx={styles.kittenTag}>{tags[index]}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GreetingBlock;
