import { Metadata } from 'next';

import MainPage from '@/components/pages/main-page';
import { MainPageProps } from '@/components/pages/main-page/MainPage';
import StudentResourcesAPI from '@/lib/api/student-resources/StudentResourcesAPI';
import mainMetadata from '@/lib/metadata/main';

export const metadata: Metadata = mainMetadata;

export default async function Main() {
  let data: MainPageProps['data'];

  try {
    data = await StudentResourcesAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }

  return <MainPage data={data} />;
}
