import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import RegisterPage from '@/components/pages/register/register-page';
import type { RegisterPageProps } from '@/components/pages/register/register-page/RegisterPage';
import { GroupAPI } from '@/lib/api/group/GroupAPI';

export const getStaticProps: GetStaticProps<RegisterPageProps> = async () => {
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

const Register = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <RegisterPage {...props} />
);

export default Register;
