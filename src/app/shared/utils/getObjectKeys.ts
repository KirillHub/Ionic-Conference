export const setObjectKeys = (val: any, filteredProps: string[]) => {
  const filtered = Object.keys(val).filter((key, _) =>
    filteredProps.includes(key) ? null : key
  );
  return filtered;
};
