import { PersonalTeacherCardProps } from '@/components/pages/personal-teacher-page/personal-teacher-card/PersonalTeacherCard';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

export const transformData = (
  data: GetTeacherDTO,
): PersonalTeacherCardProps => ({
  imageSrc: data.avatar,
  firstName: data.firstName,
  lastName: data.lastName,
  middleName: data.middleName,
  rating: 3,
  description: data.description,
  roles: data.roles,
  contacts: data.contacts,
});
