import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import AboutPage from '@/components/pages/about-page';
import aboutMetadata from '@/lib/metadata/about';
export const metadata: Metadata = aboutMetadata;
const About = () => (
  <PageLayout>
    <AboutPage />
  </PageLayout>
);

export default About;
