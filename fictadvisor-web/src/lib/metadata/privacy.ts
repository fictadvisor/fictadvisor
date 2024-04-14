import { Metadata } from 'next';

const title = 'Політика конфіденційності | FICE Advisor';
const description =
  'На цій сторінці ми надаємо опис процесу збору та обробки персональних даних, а також умови їх видалення. Персональні дані видаляються після відрахування користувача з факультету, за власним запитом користувача або після деактивації системи.';

const privacyMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};
export default privacyMetadata;
