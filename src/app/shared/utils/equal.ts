export const isEqual = (arr1: unknown[], arr2: unknown[]) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);
