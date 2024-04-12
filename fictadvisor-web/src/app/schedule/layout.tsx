import { ReactNode } from 'react';
import { Metadata } from 'next';

import scheduleMetadata from '@/lib/metadata/schedule';

export const metadata: Metadata = scheduleMetadata;

const SchedulePageWrapperLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default SchedulePageWrapperLayout;
