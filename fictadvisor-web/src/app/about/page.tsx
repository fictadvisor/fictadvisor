import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import AboutPage from '@/components/pages/about-page';
export const metadata: Metadata = {
  title: 'Про нас | FICE Advisor',
  openGraph: {
    title: 'Про нас | FICE Advisor',
  },
};
const About = () => (
  <PageLayout>
    <AboutPage />
  </PageLayout>
);

export default About;
