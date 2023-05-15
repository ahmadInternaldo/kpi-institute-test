import * as bcrypt from 'bcrypt';

export const hash = async (hashPassword: string): Promise<string> => {
  const saltOrRounds = 10;
  const password = await bcrypt.hash(hashPassword, saltOrRounds);
  return password;
};

export const matching = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};
