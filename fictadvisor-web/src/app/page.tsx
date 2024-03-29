import { Metadata } from 'next';

import MainPage from '@/components/pages/main-page';
import { MainPageProps } from '@/components/pages/main-page/MainPage';
import StudentResourcesAPI from '@/lib/api/student-resources/StudentResourcesAPI';

export const metadata: Metadata = {
  title: 'FICE Advisor',
  description:
    'Зустрічай FICE Advisor — офіційний сайт Студради ФІОТ. Опитування про викладачів, багатофункціональний розклад, керування групою, набори в наше активне ком’юніті, розіграш шар та інші інструменти — шукай саме тут!',
  openGraph: {
    title: 'FICE Advisor',
    description:
      'Зустрічай FICE Advisor — офіційний сайт Студради ФІОТ. Опитування про викладачів, багатофункціональний розклад, керування групою, набори в наше активне ком’юніті, розіграш шар та інші інструменти — шукай саме тут!',
  },
};

export default async function Main() {
  let data: MainPageProps['data'];

  try {
    data = await StudentResourcesAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }

  return <MainPage data={data} />;
}
