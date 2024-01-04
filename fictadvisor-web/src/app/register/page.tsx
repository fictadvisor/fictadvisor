import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import RegisterPage from '@/components/pages/register/register-page';
import type { RegisterPageProps } from '@/components/pages/register/register-page/RegisterPage';
import GroupAPI from '@/lib/api/group/GroupAPI';
export const metadata: Metadata = {
  title: 'Реєстрація у FICT Advisor',
};
export default async function Register() {
  let data: RegisterPageProps['data'];
  try {
    data = await GroupAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }
  return (
    <PageLayout hasFooter={false} hasHeader={false} robots="noindex">
      <RegisterPage data={data} />
    </PageLayout>
  );
}
