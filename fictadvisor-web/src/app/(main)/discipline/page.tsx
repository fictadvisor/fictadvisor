import { Suspense } from 'react';

import PersonalTeacherSubjectPage from './PersonalTeacherSubjectPage';

const Page = () => {
  return (
    <Suspense>
      <PersonalTeacherSubjectPage />
    </Suspense>
  );
};

export default Page;
