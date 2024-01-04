import { Test } from '@nestjs/testing';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { NotEnoughAnswersException } from '../../utils/exceptions/NotEnoughAnswersException';
import { ExcessiveAnswerException } from '../../utils/exceptions/ExcessiveAnswerException';
import { WrongTimeException } from '../../utils/exceptions/WrongTimeException';

describe('DisciplineTeacherService', () => {
  let disciplineTeacherService: DisciplineTeacherService;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [DisciplineTeacherService],
    }).useMocker(() => ({}))
      .compile();

    disciplineTeacherService = testingModule.get(DisciplineTeacherService);
  });

  describe('checkRequiredQuestions', () => {
    it('should return undefined if there are enough answers', async () => {
      const dbQuestions = [{
        id: 'id',
        isRequired: true,
      }] as any;
      const answers = [{
        questionId: 'id',
        value: 5,
      }] as any;

      const result = await disciplineTeacherService.checkRequiredQuestions(dbQuestions, answers);
      expect(result).toBeUndefined();
    });

    it('should throw NotEnoughAnswersException if there are not enough answers',  () => {
      const dbQuestions = [{
        id: 'id',
        isRequired: true,
      }] as any;
      const answers = [{
        questionId: 'id1',
        value: 5,
      }] as any;

      expect.assertions(1);
      disciplineTeacherService.checkRequiredQuestions(dbQuestions, answers)
        .catch((err) => expect(err).toBeInstanceOf(NotEnoughAnswersException));
    });
  });

  describe('checkExcessiveQuestions', () => {
    it('should return undefined if there are not excessive answers', async () => {
      const dbQuestions = [{
        id: 'id',
      }] as any;
      const answers = [{
        questionId: 'id',
        value: 5,
      }] as any;

      const  result = await disciplineTeacherService.checkExcessiveQuestions(dbQuestions, answers);
      expect(result).toBeUndefined();
    });

    it('should throw ExcessiveAnswerException if there are excessive answers',  () => {
      const dbQuestions = [{
        id: 'id',
      }] as any;
      const answers = [
        {
          questionId: 'id',
          value: 5,
        },
        {
          questionId: 'id1',
          value: 3,
        }] as any;

      expect.assertions(1);
      disciplineTeacherService.checkExcessiveQuestions(dbQuestions, answers)
        .catch((err) => expect(err).toBeInstanceOf(ExcessiveAnswerException));
    });
  });

  describe('checkIsUnique', () => {
    it('should return undefined if there are no duplicate questions', async () => {
      const answers = [
        {
          questionId: 'id',
          value: 5,
        },
        {
          questionId: 'id1',
          value: 3,
        }] as any;

      const result = await disciplineTeacherService.checkIsUnique(answers);
      expect(result).toBeUndefined();
    });

    it('should throw ExcessiveAnswerException if there are duplicate questions', () => {
      const answers = [
        {
          questionId: 'id',
          value: 5,
        },
        {
          questionId: 'id',
          value: 3,
        }] as any;

      expect.assertions(1);
      disciplineTeacherService.checkIsUnique(answers)
        .catch((err) => expect(err).toBeInstanceOf(ExcessiveAnswerException));
    });

    describe('checkSendingTime ', () => {
      it('should return undefined if voting is in progress', async () => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date('2023-06-05T00:00:00'));
        jest.spyOn(disciplineTeacherService, 'getPollTimeBorders').mockImplementation(async () => ({
          startPoll: new Date('2023-05-05T00:00:00'),
          endPoll: new Date('2023-07-05T00:00:00'),
        }));

        const result = await disciplineTeacherService.checkSendingTime();
        expect(result).toBeUndefined();
      });

      it('should throw WrongTimeException if voting is not in progress',  () => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date('2023-08-05T00:00:00'));
        jest.spyOn(disciplineTeacherService, 'getPollTimeBorders').mockImplementation(async () => ({
          startPoll: new Date('2023-05-05T00:00:00'),
          endPoll: new Date('2023-07-05T00:00:00'),
        }));

        expect.assertions(1);
        disciplineTeacherService.checkSendingTime()
          .catch((err) => expect(err).toBeInstanceOf(WrongTimeException));
      });
    });
  });
});