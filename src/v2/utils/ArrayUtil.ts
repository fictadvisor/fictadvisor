export function checkIfArrayIsUnique (myArray) {
  return myArray.length === new Set(myArray).size;
}