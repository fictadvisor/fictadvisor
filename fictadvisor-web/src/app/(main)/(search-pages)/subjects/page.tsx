import { Suspense } from 'react';

import SubjectSearchPage from './SubjectSearchPage';

const Page = () => (
  <Suspense>
    <SubjectSearchPage />
  </Suspense>
);

export default Page;
