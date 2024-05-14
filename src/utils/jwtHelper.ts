import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenEnum } from '../constants/constants';

const PasswordHashing = async (password: string): Promise<string> => {
  const result = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
  return result;
};

const PasswordCompare = async (password: string, passwordHash: string): Promise<boolean> => {
  const matched = await bcrypt.compare(password, passwordHash);
  return matched;
};

const GenerateToken = (data: TokenData, type: string): string => {
  let secretKey;
  let expiresTime;
  if (type === TokenEnum.access) {
    secretKey = process.env.JWT_ACCESS_TOKEN as string;
    expiresTime = process.env.JWT_ACCESS_EXPIRES_TIME as string;
  } else if (type === TokenEnum.refresh) {
    secretKey = process.env.JWT_REFRESH_TOKEN as string;
    expiresTime = process.env.JWT_REFRESH_EXPIRES_TIME as string;
  } else {
    secretKey = process.env.JWT_RESET_PASSWORD_TOKEN as string;
    expiresTime = process.env.RESET_PASSWORD_EXPIRES_TIME as string;
  }

  const token = jwt.sign(data, secretKey, {
    expiresIn: String(expiresTime),
  });

  return token;
};

const ExtractToken = (token: string, type: string): TokenData | null => {
  let secretKey;
  if (type === TokenEnum.access) {
    secretKey = process.env.JWT_ACCESS_TOKEN as string;
  } else if (type === TokenEnum.refresh) {
    secretKey = process.env.JWT_REFRESH_TOKEN as string;
  } else {
    secretKey = process.env.JWT_RESET_PASSWORD_TOKEN as string;
  }

  let resData: any;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: TokenData = <TokenData>resData;
    return result;
  }

  return null;
};

export default {
  PasswordHashing,
  PasswordCompare,
  GenerateToken,
  ExtractToken,
};
