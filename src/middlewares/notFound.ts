import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/errorHandler';
import { HttpCode } from '../utils/httpCode';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new ErrorHandler(`Not Found - ${req?.originalUrl}`, HttpCode.NOT_FOUND));
};

export default notFound;
