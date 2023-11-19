import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import TeacherSearchPage from '@/components/pages/search-pages/teacher-search';

const TeacherPage: FC = () => {
  return (
    <PageLayout
      title="Викладачі"
      description="Тут ти знайдеш інформацію про викладачів, яка допоможе тобі знайти викладача для твоїх потреб. Ця сторінка пропонує широкі можливості пошуку та фільтрації, щоб забезпечити точні й зручні результати."
    >
      <TeacherSearchPage />
    </PageLayout>
  );
};

export default TeacherPage;
