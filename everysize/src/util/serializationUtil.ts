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

export const booleanToString = (value: boolean | null | undefined): string | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return value ? '1' : '0';
};

export const booleanFromString = (value: string | null | undefined): boolean | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return value === '1' || value === 'true';
};
