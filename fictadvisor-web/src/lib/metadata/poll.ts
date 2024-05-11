import { Metadata } from 'next';

const title = 'Опитування';
const description =
  'На цій сторінці ти зможеш пройти опитування про викладача. Ця сторінка створена для збору відгуків та оцінок його методики викладання та загального враження від занять. ';

const PollMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: '/opengraph-images/poll.jpg',
  },
};
export default PollMetadata;
