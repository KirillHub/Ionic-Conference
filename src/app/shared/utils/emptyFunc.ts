function emptyArray(array: any[], message: string) {
  const error = `Empty ${message}`;
  if (array.length === 0) return error;
  return array;
}
