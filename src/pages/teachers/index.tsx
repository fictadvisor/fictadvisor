import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import TeacherSearchPage from '@/components/pages/search-pages/teacher-search';

const TeacherPage: FC = () => {
  return (
    <PageLayout
      title="Викладачі"
      description="Тут ви знайдете інформацію про викладачів, яка допоможе вам знайти викладача для ваших потреб. Ця сторінка пропонує широкі можливості пошуку та фільтрації, щоб забезпечити точні й зручні результати."
    >
      <TeacherSearchPage />
    </PageLayout>
  );
};

export default TeacherPage;
