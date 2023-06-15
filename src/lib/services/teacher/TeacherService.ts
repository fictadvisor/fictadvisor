import { GetTeacherCommentsDTO } from '@/lib/api/teacher/dto/GetTeacherCommentsDTO';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';
import { GetTeacherMarksDTO } from '@/lib/api/teacher/dto/GetTeacherMarksDTO';
import { GetTeacherSubjectDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectDTO';
import { GetTeacherSubjectsDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectsDTO';
import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';

const MIN_MARKS_LENGTH = 8;

export interface GetTeacherResponse {
  info: GetTeacherDTO;
  subjects: GetTeacherSubjectsDTO['subjects'];
  comments: GetTeacherCommentsDTO;
  marks: GetTeacherMarksDTO['marks'];
  hasEnoughMarks: boolean;
  marksText: string;
  commentText: string;
  buttonInfo: {
    text: string;
    href: string;
  }[];
}

export interface GetTeacherSubjectResponse {
  info: GetTeacherSubjectDTO;
  comments: GetTeacherCommentsDTO;
  marks: GetTeacherMarksDTO['marks'];
  marksText: string;
  commentText: string;
  hasEnoughMarks: boolean;
  buttonInfo: {
    text: string;
    href: string;
  }[];
}

class TeacherService {
  async getTeacherPageInfo(
    teacherId: string,
    userId: string | undefined,
  ): Promise<GetTeacherResponse> {
    const info = await TeacherAPI.get(teacherId);
    const subjects = (await TeacherAPI.getTeacherSubjects(teacherId)).subjects;
    const comments = await TeacherAPI.getTeacherComments(teacherId);
    const marks = (await TeacherAPI.getTeacherMarks(teacherId)).marks;
    const hasEnoughMarks = marks[0]?.amount >= MIN_MARKS_LENGTH;
    const marksAmount = marks[0]?.amount;
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
          text: `Перейти до опитування ${discipline.subjectName}`,
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
  ): Promise<GetTeacherSubjectResponse> {
    const info = await TeacherAPI.getTeacherSubject(teacherId, subjectId);
    const comments = await TeacherAPI.getTeacherComments(teacherId, subjectId);
    const marks = (await TeacherAPI.getTeacherMarks(teacherId, subjectId))
      .marks;
    const hasEnoughMarks = marks[0]?.amount >= MIN_MARKS_LENGTH;
    const marksAmount = marks[0]?.amount;

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
          text: `Перейти до опитування ${discipline.subjectName}`,
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
