export const CHARACTERS_NUMERIC = '1234567890';
export const CHARACTERS_ALPHA_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export const CHARACTERS_ALPHA_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const CHARACTERS_ALPHA = `${CHARACTERS_ALPHA_LOWERCASE}${CHARACTERS_ALPHA_UPPERCASE}`;
export const CHARACTERS_ALPHANUMERIC = `${CHARACTERS_ALPHA}${CHARACTERS_NUMERIC}`;
export const CHARACTERS_HEX = `${CHARACTERS_NUMERIC}abcdef`;

export const generateRandomString = (length: number, characters: string = CHARACTERS_ALPHANUMERIC): string => {
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

export const generateUUID = (shouldIncludeDashes: boolean = true): string => {
  let uuid = generateRandomString(32, CHARACTERS_HEX);
  if (shouldIncludeDashes) {
    uuid = [
      uuid.substring(0, 8),
      uuid.substring(8, 12),
      uuid.substring(12, 16),
      uuid.substring(16, 20),
      uuid.substring(20)]
      .join('-');
  }
  return uuid;
};
