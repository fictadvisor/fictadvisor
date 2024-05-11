import { Metadata } from 'next';

const title = 'Розклад';

const scheduleMetadata: Metadata = {
  title,
  openGraph: {
    title,
    images: '/opengraph-images/schedule.jpg',
  },
};
export default scheduleMetadata;
