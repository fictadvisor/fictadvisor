import PageLayout from "../components/layout/PageLayout";
import Link from 'next/link';

const IndexPage = () => {
  return (
    <PageLayout>
      <Link href="/teachers/lisovichenko-oleg-ivanovich">
        <a>lisovichenko-oleg-ivanovich</a>
      </Link>
    </PageLayout>
  );
};

export default IndexPage;