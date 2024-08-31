import dynamic from 'next/dynamic';

const AccountPage = dynamic(() => import('./AccountPage'), { ssr: false });

const Page = () => {
  return <AccountPage />;
};

export default Page;
