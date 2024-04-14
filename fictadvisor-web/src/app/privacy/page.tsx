import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import PrivacyPage from '@/components/pages/privacy-page';
import privacyMetadata from '@/lib/metadata/privacy';
export const metadata: Metadata = privacyMetadata;
const Privacy: FC = () => {
  return (
    <PageLayout>
      <PrivacyPage />
    </PageLayout>
  );
};

export default Privacy;
