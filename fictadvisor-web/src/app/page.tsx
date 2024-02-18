import { Metadata } from 'next';

import MainPage from '@/components/pages/main-page';
import { MainPageProps } from '@/components/pages/main-page/MainPage';
import StudentResourcesAPI from '@/lib/api/student-resources/StudentResourcesAPI';

export const metadata: Metadata = {
  title: 'FICT Advisor',
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
