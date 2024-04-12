import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import pollMetadata from '@/lib/metadata/poll';

export const metadata: Metadata = pollMetadata;

const PollPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default PollPageLayout;
