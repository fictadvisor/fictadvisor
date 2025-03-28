import { Test } from '@nestjs/testing';
import { DateService } from '../../../src/modules/date/v2/date.service';
import { PrismaModule } from '../../../src/database/prisma.module';
import { DataNotFoundException } from '../../../src/common/exceptions/data-not-found.exception';

describe('DateService', () => {
  let dateService: DateService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DateService],
      imports: [PrismaModule],
    }).compile();

    dateService = moduleRef.get(DateService);
  });

  describe('getCurrentSemester', () => {
    it('should return the date of the current semester', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-06-06T00:00:00'));

      const result = await dateService.getCurrentSemester();

      expect(result).toBeDefined();
    });

    it('should throw an exception if no data was found', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2022-06-06T00:00:00'));

      await dateService.getCurrentSemester()
        .catch((e) => expect(e).toBeInstanceOf(DataNotFoundException));
    });
  });
});
