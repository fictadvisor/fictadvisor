import { Suspense } from 'react';

import TeacherSearchPage from './TeacherSearchPage';

const Page = () => (
  <Suspense>
    <TeacherSearchPage />
  </Suspense>
);

export default Page;
