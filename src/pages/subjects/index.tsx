import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import SubjectSearchPage from '@/components/pages/search-pages/subject-search';

const SubjectsPage: FC = () => {
  return (
    <PageLayout
      title="Предмети"
      description="Предмети - сторінка пошуку і показу предметів. За допомогою цієї сторінки ви можете знайти та переглянути різні предмети. На сторінці розташована пошукова форма, яка дозволяє вам ввести пошукові параметри та вибрати деякі критерії сортування предметів. "
    >
      <SubjectSearchPage />
    </PageLayout>
  );
};

export default SubjectsPage;
