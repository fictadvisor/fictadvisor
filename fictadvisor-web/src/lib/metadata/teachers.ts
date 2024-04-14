import { Metadata } from 'next';

const title = 'Викладачі';
const description =
  'Тут ти знайдеш інформацію про викладачів, яка допоможе тобі знайти викладача для твоїх потреб. Ця сторінка пропонує широкі можливості пошуку та фільтрації, щоб забезпечити точні й зручні результати.';

const teachersMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};
export default teachersMetadata;
