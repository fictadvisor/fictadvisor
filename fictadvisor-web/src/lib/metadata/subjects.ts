import { Metadata } from 'next';

const title = 'Предмети';
const description =
  'Предмети - сторінка пошуку і показу предметів. За допомогою цієї сторінки ти можеш знайти та переглянути різні предмети. На сторінці розташована пошукова форма, яка дозволяє тобі ввести пошукові параметри та вибрати деякі критерії сортування предметів. ';

const subjectsMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: '/opengraph-images/subjects.jpg',
  },
};
export default subjectsMetadata;
