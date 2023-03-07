import { ContactType } from '@/components/pages/personal-teacher-page/contacts';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

export const testData: GetTeacherDTO = {
  id: '43e60654-8a5a-49c0-b40d-e6db17570b64',
  firstName: 'Катерина',
  middleName: 'Анатоліївна',
  lastName: 'Васильченко-Деружко',
  description:
    'Викладає на факультеті ФІОТ впродовж 10 років. \n' +
    'Викладає на факультеті ФІОТ впродовж 10 років.  Викладає на факультеті ФІОТ впродовж 10 років. Дуже почесна жаба. Викладає на факультеті ФІОТ впродовж 10 років. \n' +
    'Викладає на факультеті ФІОТ впродовж 10 років.  Викладає на факультеті ФІОТ впродовж 10 років.   ',
  avatar: 'https://i.imgur.com/0ySPaF0.jpeg',
  roles: ['LECTURER', 'LABORANT', 'PRACTICIAN'],
  contacts: [
    {
      id: 'b1c4fb22-2422-4adf-b0e0-28325645054a',
      name: ContactType.YOUTUBE,
      displayName: 'elizabeth.yarmolenko1@gmail.com',
      link: '',
    },
    {
      id: 'b1c4fb22-2422-4adf-b0e0-28325645054a',
      name: ContactType.TELEGRAM,
      displayName: 'Телеграм-канал',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'b1c4fb22-2422-4adf-b0e0-28325645054a',
      name: ContactType.TWITTER,
      displayName: 'Twiter',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  ],
};
