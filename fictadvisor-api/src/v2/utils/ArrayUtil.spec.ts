import { checkIfArrayIsUnique, filterAsync, find, some } from './ArrayUtil';

describe('ArrayUtil', () => {
  describe('checkIfArrayIsUnique', () => {
    it('should return true if array is unique', () => {
      const array = [1, 4, 6, 8];
      const result = checkIfArrayIsUnique(array);
      expect(result).toBeTruthy();
    });

    it('should return false if array is not unique', () => {
      const array = [1, 4, 6, 1];
      const result = checkIfArrayIsUnique(array);
      expect(result).toBeFalsy();
    });
  });

  describe('filterAsync', () => {
    it('should correctly async filter even numbers', async () => {
      const array = [1, 4, 6, 7];
      const callback = async (num) => num % 2 === 0;

      const result = await filterAsync(array, callback);

      expect(result).toStrictEqual([4, 6]);
    });
  });

  describe('some', () => {
    it('should return true if the array contains target', () => {
      const array = [{ field: 'a' }, { field: 'b' }, { field: 'c' }];
      const field = 'field';
      const comp = 'b';

      const result = some(array, field, comp);

      expect(result).toBe(true);
    });

    it('should return false if the array does not contain target', () => {
      const array = [{ field: 'a' }, { field: 'b' }, { field: 'c' }];
      const field = 'field';
      const comp = 'd';

      const result = some(array, field, comp);

      expect(result).toBe(false);
    });
  });

  describe('find', () => {
    it('should return the found object if it is in the array', () => {
      const array = [{ field: 'a' }, { field: 'b' }, { field: 'c' }];
      const field = 'field';
      const comp = 'a';

      const result = find(array, field, comp);

      expect(result).toStrictEqual({ field: 'a' });
    });

    it('should return undefined if the target is not found', () => {
      const array = [{ field: 'a' }, { field: 'b' }, { field: 'c' }];
      const field = 'field';
      const comp = 'f';

      const result = find(array, field, comp);

      expect(result).toBe(undefined);
    });
  });
});
