import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import MainPage from '@/components/pages/main-page';
import { MainPageProps } from '@/components/pages/main-page/MainPage';
import { StudentResourcesAPI } from '@/lib/api/student-resources/StudentResourcesAPI';

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
  let data: MainPageProps['data'];

  try {
    data = await StudentResourcesAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }

  return {
    props: {
      data,
    },
  };
};

const Main = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <MainPage {...props} />
);

export default Main;
