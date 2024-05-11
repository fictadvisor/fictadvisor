import { Metadata } from 'next';

const title = 'FICE Advisor';
const description =
  'Зустрічай FICE Advisor — офіційний сайт Студради ФІОТ. Опитування про викладачів, багатофункціональний розклад, керування групою, набори в наше активне ком’юніті, розіграш шар та інші інструменти — шукай саме тут!';

const mainMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: '/opengraph-images/main.jpg',
  },
};
export default mainMetadata;
