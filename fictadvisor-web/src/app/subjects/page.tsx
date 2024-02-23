import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import SubjectSearchPage from '@/components/pages/search-pages/subject-search';

export const metadata: Metadata = {
  title: 'Предмети',
  description:
    'Предмети - сторінка пошуку і показу предметів. За допомогою цієї сторінки ти можеш знайти та переглянути різні предмети. На сторінці розташована пошукова форма, яка дозволяє тобі ввести пошукові параметри та вибрати деякі критерії сортування предметів. ',
  openGraph: {
    title: 'Предмети',
    description:
      'Предмети - сторінка пошуку і показу предметів. За допомогою цієї сторінки ти можеш знайти та переглянути різні предмети. На сторінці розташована пошукова форма, яка дозволяє тобі ввести пошукові параметри та вибрати деякі критерії сортування предметів. ',
  },
};
const SubjectsPage: FC = () => {
  return (
    <PageLayout>
      <SubjectSearchPage />
    </PageLayout>
  );
};

export default SubjectsPage;
