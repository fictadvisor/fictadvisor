import { Suspense } from 'react';

import AccountPage from './AccountPage';

const Page = () => {
  return (
    <Suspense>
      <AccountPage />
    </Suspense>
  );
};

export default Page;
