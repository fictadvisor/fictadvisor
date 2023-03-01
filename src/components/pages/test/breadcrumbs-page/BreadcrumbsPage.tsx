import Breadcrumbs from '@/components/common/ui/breadcrumbs';

import pageStyles from '../test-pages.module.scss';

const BreadcrumbsPage = () => (
  <div className={pageStyles['test-page-wrap']}>
    <Breadcrumbs
      items={[
        {
          label: 'Головна',
          href: '/',
        },
        { label: 'Викладачі', href: '/subjects' },
        {
          label: 'Васильченко-Деружко Катерина Анатоліївна',
          href: '/subjects',
        },
        {
          label: 'Математичний аналіз. Частина 1. Диференціальне числення',
          href: '/subjects',
        },
      ]}
    />
  </div>
);

export default BreadcrumbsPage;
