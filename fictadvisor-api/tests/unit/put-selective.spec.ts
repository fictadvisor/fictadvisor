import { UserService } from '../../src/modules/user/v2/user.service';

// Accepting a student into a group ran `putSelective` over every year the
// semester table knows about and read `selective/<year>.csv` for each. The newest
// year has no file until someone uploads it, so from the day a September semester
// starts the S3 NoSuchKey surfaced as a 500 and no request could be accepted.
describe('putSelective with a year that has no selective file', () => {
  const build = (existingFiles: string[]) => {
    const read: string[] = [];
    const service: any = Object.create(UserService.prototype);

    service.studentRepository = {
      findOne: async () => ({ firstName: 'Іван', lastName: 'Петренко', group: { code: 'ІМ-31' } }),
      updateById: async () => undefined,
    };
    service.dateService = { getYears: async () => [2024, 2025, 2026] };
    service.disciplineRepository = { findOne: async () => undefined };
    service.fileService = {
      checkFileExist: async (path: string) => existingFiles.includes(path),
      getFileContent: async (path: string) => {
        if (!existingFiles.includes(path)) {
          throw Object.assign(new Error('The specified key does not exist.'), { name: 'NoSuchKey' });
        }
        read.push(path);
        return '';
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
