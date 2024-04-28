import { Metadata } from 'next';

const title = 'Сторінку не знайдено';

const notFoundMetadata: Metadata = {
  title,
  openGraph: {
    title,
  },
};
export default notFoundMetadata;
