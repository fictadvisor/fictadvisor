import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import * as styles from '@/components/pages/main-page/completely-normal-folder/GreetingBlock.styles';

import artem from '../../../../../public/images/main-page/avatars/artem.png';
import danya from '../../../../../public/images/main-page/avatars/danya.png';
import dima from '../../../../../public/images/main-page/avatars/dima.png';
import illia from '../../../../../public/images/main-page/avatars/illia.png';
import katya from '../../../../../public/images/main-page/avatars/katya.png';
import oleg from '../../../../../public/images/main-page/avatars/oleg.png';
import pasha from '../../../../../public/images/main-page/avatars/pasha.png';
import sasha from '../../../../../public/images/main-page/avatars/sasha.png';
import stas from '../../../../../public/images/main-page/avatars/stas.png';
import svyat from '../../../../../public/images/main-page/avatars/svyat.png';
import vovka from '../../../../../public/images/main-page/avatars/vovka.png';

import stylesCSS from './GreetingBlock.module.scss';

const GreetingBlock = () => {
  const imgScr = '/images/main-page/avatars/';

  const avatars = [
    'stas',
    'svyat',
    'oleg',
    'danya',
    'katya',
    'pasha',
    'dima',
    'illia',
    'vovka',
    'artem',
    'sasha',
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
              src={imgScr + avatars[index] + '.png'}
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
