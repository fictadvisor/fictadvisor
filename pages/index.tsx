import PageLayout from "../components/layout/PageLayout";
import Link from 'next/link';

const IndexPage = () => {
  return (
    <PageLayout>
      <p><Link href="/teachers"><a>teachers page</a></Link>
      </p>
      <p><Link href="/teachers/lisovichenko-oleg-ivanovich"><a>lisovichenko-oleg-ivanovich</a></Link></p>
    </PageLayout>
  );
};

export default IndexPage;