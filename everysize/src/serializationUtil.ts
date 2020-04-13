export const stringListToString = (value: string[] | null | undefined, delimiter: string = ','): string | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return '';
  }
  return value.join(delimiter);
};

export const stringListFromString = (value: string | null | undefined, delimiter: string = ','): string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return [];
  }
  return value ? value.split(delimiter) : [];
};
