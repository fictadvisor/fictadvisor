import { Teacher } from '@/types/teacher';

export interface EditPersonalInfoBody
  extends Pick<
    Teacher,
    'firstName' | 'middleName' | 'lastName' | 'avatar' | 'description'
  > {}
