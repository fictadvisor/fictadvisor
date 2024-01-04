import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import * as stylesMUI from '@/components/pages/privacy-page/PrivacyPage.styles';

const PrivacyPage = () => {
  return (
    <Box sx={stylesMUI.privacyContent}>
      <Typography variant="h4Bold">Політика конфіденційності</Typography>
      <Box sx={stylesMUI.privacyList}>
        <Box>
          <Typography
            variant={'body1'}
            paragraph
            sx={stylesMUI.privacyListInfo}
          >
            FICT Advisor – це інформаційна система Студради ФІОТ для студентів
            Факультету інформатики та обчислювальної техніки Національного
            технічного університету України “Київський політехнічний інститут
            ім. Ігоря Сікорського” (далі – Система). Основними завданнями
            Системи є допомога студентам факультету, забезпечення якості вищої
            освіти, цифровізація та автоматизація внутрішніх та зовнішніх
            процесів Студради ФІОТ та її відділів.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6Bold">Які дані ми збираємо?</Typography>
          <Typography
            variant={'body1'}
            paragraph
            sx={stylesMUI.privacyListInfo}
          >
            Згідно з законом України “Про захист персональних прав”,
            персональними даними вважаються такі дані, за допомогою яких можна
            однозначно ідентифікувати особу. Система збирає такі дані: прізвище,
            ім’я, по батькові, академічна група. За запитом Адміністрації
            Системи персональні дані користувача можуть бути уточнені та
            відформатовані до одного виду.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6Bold">Як ми ці дані оброблюємо?</Typography>
          <Typography
            variant={'body1'}
            paragraph
            sx={stylesMUI.privacyListInfo}
          >
            Система є Open-Source проєктом, тому весь код знаходиться у
            публічному просторі за посиланням{' '}
            <Link href={'https://github.com/fictadvisor/'}>
              https://github.com/fictadvisor/
            </Link>
            . Персональні дані використовуються з метою верифікації особистості
            та уніфікації зареєстрованих користувачів. Це зроблено для того, щоб
            контингент користувачів, який зареєстрований у Системі, відповідав
            контингенту Факультету, звідси результати опитувань та інших
            проведених подій будуть більш репрезентативними і достовірними.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6Bold" sx={stylesMUI.privacyListInfo}>
            Коли ми видаляємо персональні дані?
          </Typography>
          <Typography
            variant={'body1'}
            paragraph
            sx={stylesMUI.privacyListInfo}
          >
            Персональні дані користувача видаляються: після відрахування
            користувача з Факультету; за власним запитом користувача; після
            деактивації системи. Адміністрація Системи залишає за собою право
            видалити акаунт та персональні дані користувача у випадках, коли дії
            користувача шкодять функціонуванню Системи.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPage;
