import { checkIfArrayIsUnique } from './ArrayUtil';

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
});