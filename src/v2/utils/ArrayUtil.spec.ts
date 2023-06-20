import { checkIfArrayIsUnique, filterAsync } from './ArrayUtil';

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
});
