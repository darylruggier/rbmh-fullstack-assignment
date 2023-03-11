import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, salt: string | number): Promise<string> => {
  return await bcrypt.hash(password, salt);
};
