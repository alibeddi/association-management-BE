import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils/errorHandler';
import AsyncHandler from 'express-async-handler';
import { HttpCode } from '../utils/httpCode';
import JwtHelper from '../utils/jwtHelper';
import UserRepository from '../database/mongodb/repositories/user.repository';
import { TokenEnum } from '../constants/constants';
import { Types } from 'mongoose';

const Authenticated = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req?.cookies;

  const authToken = req?.headers?.authorization;
  const token = authToken && authToken.split(' ')[1];

  if (!token || !refreshToken) {
    return next(new ErrorHandler('Login first to access this resource.', HttpCode.UNAUTHORIZED));
  }

  const decoded = JwtHelper.ExtractToken(token, TokenEnum.access);
  if (!decoded) {
    return next(new ErrorHandler('Invalid Token!', HttpCode.UNAUTHORIZED));
  }

  req.user = await UserRepository.getById(new Types.ObjectId(decoded?.id));

  next();
});

export default { Authenticated };
