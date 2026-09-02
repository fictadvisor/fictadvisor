import { UserService } from '../../src/modules/user/v2/user.service';

// Accepting a student into a group ran `putSelective` over every year the
// semester table knows about and read `selective/<year>.csv` for each. The newest
// year has no file until someone uploads it, so from the day a September semester
// starts the S3 NoSuchKey surfaced as a 500 and no request could be accepted.
describe('putSelective with a year that has no selective file', () => {
  const build = (existingFiles: string[], rows = '') => {
    const read: string[] = [];
    const service: any = Object.create(UserService.prototype);

    service.studentRepository = {
      findOne: async () => ({ firstName: 'Іван', lastName: 'Петренко', group: { code: 'ІМ-31' } }),
      updateById: async () => undefined,
    };
    service.dateService = { getYears: async () => [2024, 2025, 2026] };
    service.disciplineRepository = { findOne: async () => undefined };
    service.fileService = {
      findFileContent: async (path: string) => {
        if (!existingFiles.includes(path)) return undefined;
        read.push(path);
        return rows;
      },
    };

    return { service, read };
  };

  it('skips the year instead of failing the whole approval', async () => {
    const { service, read } = build(['selective/2024.csv', 'selective/2025.csv']);

    await expect(service.putSelective('student-1')).resolves.toBeUndefined();
    expect(read).toEqual(['selective/2024.csv', 'selective/2025.csv']);
  });

  it('still reads every year that does have a file', async () => {
    const { service, read } = build([
      'selective/2024.csv', 'selective/2025.csv', 'selective/2026.csv',
    ]);

    await service.putSelective('student-1');

    expect(read).toHaveLength(3);
  });

  it('does nothing at all when no year has a file', async () => {
    const { service, read } = build([]);

    await expect(service.putSelective('student-1')).resolves.toBeUndefined();
    expect(read).toEqual([]);
  });
});

// The files the university produces are semicolon-separated. `replaceAll` returns
// a new string instead of editing in place, so its result was dropped and every
// row was then split on a comma that was not there — leaving subject, semester
// and student all undefined, so nothing was ever imported, for any year.
describe('reading a semicolon-separated selective file', () => {
  const HEADER = 'Fname;Course Id;Course;Departament;Semestr;Results;Level;Group;Trainform;Student;Payment';
  const ROW = 'ФІОТ;15897;Основи розроблення ПЗ на платформі Node.js;ІСТ;4;Залік;1;ІІ-51;Очна (денна);Петренко Іван Сергійович;Бюджет';

  const build = () => {
    const looked: any[] = [];
    const connected: any[] = [];
    const service: any = Object.create(UserService.prototype);

    service.studentRepository = {
      findOne: async () => ({ firstName: 'Іван', lastName: 'Петренко', group: { code: 'ІІ-51' } }),
      updateById: async (_id: string, data: any) => connected.push(data),
    };
    service.dateService = { getYears: async () => [2026] };
    service.fileService = { findFileContent: async () => `${HEADER}\n${ROW}` };
    service.disciplineRepository = {
      findOne: async (where: any) => {
        looked.push(where);
        return { id: 'discipline-1' };
      },
    };

    return { service, looked, connected };
  };

  it('picks the subject, semester and student out of the row', async () => {
    const { service, looked } = build();

    await service.putSelective('student-1');

    expect(looked).toHaveLength(1);
    expect(looked[0]).toMatchObject({
      subject: { name: 'Основи розроблення ПЗ на платформі Node.js' },
      group: { code: 'ІІ-51' },
      year: 2026,
      semester: 2,          // Semestr 4 is the second semester of a year
      isSelective: true,
    });
  });

  it('connects the discipline it found to the student', async () => {
    const { service, connected } = build();

    await service.putSelective('student-1');

    expect(connected).toHaveLength(1);
    expect(connected[0].selectiveDisciplines.connectOrCreate.create)
      .toEqual({ disciplineId: 'discipline-1' });
  });

  it('ignores the header row and students with other names', async () => {
    const { service, looked } = build();
    service.studentRepository.findOne = async () =>
      ({ firstName: 'Марія', lastName: 'Коваленко', group: { code: 'ІІ-51' } });

    await service.putSelective('student-1');

    expect(looked).toEqual([]);
  });
});
