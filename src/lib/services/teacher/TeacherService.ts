import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import { TeacherPageInfo, TeacherSubjectPageInfo } from './types';

const MIN_MARKS_LENGTH = 8;

class TeacherService {
  async getTeacherPageInfo(
    teacherId: string,
    userId: string | undefined,
  ): Promise<TeacherPageInfo> {
    const info = await TeacherAPI.get(teacherId);
    const { subjects } = await TeacherAPI.getTeacherSubjects(teacherId);
    const comments = await TeacherAPI.getTeacherComments(teacherId);
    const { marks } = await TeacherAPI.getTeacherMarks(teacherId);
    const hasEnoughMarks = marks[0]?.amount >= MIN_MARKS_LENGTH;
    const marksAmount = marks[0]?.amount ?? 0;
    let buttonInfo = [
      {
        text: 'Перейти до опитувань',
        href: '/poll',
      },
    ];
    let text =
      'Для покращення ситуації авторизуйся та візьми участь в опитуванні:';

    if (userId) {
      const disciplines = await TeacherAPI.getTeacherDisciplines(
        teacherId,
        true,
        userId,
      );

      text = 'Для покращення ситуації візьми участь в опитуванні:';

      if (disciplines.length > 0) {
        text =
          'Для покращення ситуації візьми участь в опитуванні з наступних предметів:';

        buttonInfo = disciplines.map(discipline => ({
          text: `${discipline.subjectName}`,
          href: `/poll/${discipline.disciplineTeacherId}`,
        }));
      } else {
      }
    }

    return {
      info,
      subjects,
      comments,
      marks,
      marksText: `На жаль, оцінок недостатньо для розрахунку статистики (${marksAmount}/${MIN_MARKS_LENGTH}). ${text}`,
      commentText: `На жаль, ніхто не залишив відгук. ${text}`,
      hasEnoughMarks,
      buttonInfo,
    };
  }

  async getTeacherSubjectPageInfo(
    teacherId: string,
    subjectId: string,
    userId: string | undefined,
  ): Promise<TeacherSubjectPageInfo> {
    const info = await TeacherAPI.getTeacherSubject(teacherId, subjectId);
    const comments = await TeacherAPI.getTeacherComments(teacherId, subjectId);
    const { marks } = await TeacherAPI.getTeacherMarks(teacherId, subjectId);
    const hasEnoughMarks = marks[0]?.amount >= MIN_MARKS_LENGTH;
    const marksAmount = marks[0]?.amount ?? 0;

    let buttonInfo = [
      {
        text: 'Перейти до опитувань',
        href: '/poll',
      },
    ];

    let text =
      'Для покращення ситуації авторизуйся та візьми участь в опитуванні:';

    if (userId) {
      const disciplines = await TeacherAPI.getTeacherDisciplines(
        teacherId,
        true,
        userId,
      );

      text = 'Для покращення ситуації візьми участь в опитуванні:';

      const thisDiscipline = disciplines.filter(
        discipline => discipline.disciplineTeacherId === info.id,
      );

      if (thisDiscipline.length > 0) {
        text =
          'Для покращення ситуації візьми участь в опитуванні з наступних предметів:';
        buttonInfo = thisDiscipline.map(discipline => ({
          text: `${discipline.subjectName}`,
          href: `/poll/${discipline.disciplineTeacherId}`,
        }));
      }
    }

    return {
      info,
      comments,
      marks,
      marksText: `На жаль, оцінок недостатньо для розрахунку статистики (${marksAmount}/${MIN_MARKS_LENGTH}).\n${text}`,
      commentText: `На жаль, ніхто не залишив відгук.\n${text}`,
      hasEnoughMarks,
      buttonInfo,
    };
  }
}

export default new TeacherService();
