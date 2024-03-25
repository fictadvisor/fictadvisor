import { MetadataRoute } from 'next';

import theme from '@/styles/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FICE Advisor',
    short_name: 'FA',
    description:
      'Зустрічай FICE Advisor — офіційний сайт Студради ФІОТ. Опитування про викладачів, багатофункціональний розклад, керування групою, набори в наше активне ком’юніті, розіграш шар та інші інструменти — шукай саме тут!',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#1E1E1E',
    theme_color: '#1E1E1E',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
