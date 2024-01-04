import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import RegisterPage from '@/components/pages/register/register-page';
import type { RegisterPageProps } from '@/components/pages/register/register-page/RegisterPage';
import GroupAPI from '@/lib/api/group/GroupAPI';

// export const getStaticProps: GetStaticProps<RegisterPageProps> = async () => {
//   let data: RegisterPageProps['data'];
//
//   try {
//     data = await GroupAPI.getAll();
//   } catch (error: unknown) {
//     data = null;
//   }
//
//   return {
//     props: {
//       data,
//     },
//     revalidate: 60 * 60 * 6,
//   };
// };
export const getServerSideProps: GetServerSideProps<
  RegisterPageProps
> = async () => {
  let data: RegisterPageProps['data'];

  try {
    data = await GroupAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }

  return {
    props: {
      data,
    },
  };
};

const Register = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => (
  <PageLayout
    hasFooter={false}
    hasHeader={false}
    robots="noindex"
    title="Реєстрація у FICT Advisor"
  >
    <RegisterPage {...props} />
  </PageLayout>
);

export default Register;
