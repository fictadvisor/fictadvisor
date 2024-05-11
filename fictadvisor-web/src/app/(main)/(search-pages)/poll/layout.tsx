import { ReactNode } from 'react';
import { Metadata } from 'next';

import PollMetadata from '@/lib/metadata/poll';

export const metadata: Metadata = PollMetadata;

const PollPageLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default PollPageLayout;
