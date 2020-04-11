
export const getFirstWithKeyValue = <T>(list: T[], key: keyof T, value: any): T | null => {
  const candidates = list.filter((item: T): boolean => item[key] === value);
  if (candidates.length > 0) {
    return candidates[0]
  }
  return null;
}
