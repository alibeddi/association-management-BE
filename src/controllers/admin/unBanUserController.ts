import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import _ from 'lodash';

import {
  BadRequestResponse,
  NotFoundResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { Types } from 'mongoose';

export const unBanUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const UserId = new Types.ObjectId(req.params.id);
  const user = await UserRepo.getOneById(UserId);
  if (!user) return new NotFoundResponse('no user found with that id').send(res);
  if (!user.isBanned) return new BadRequestResponse('this user is not banned').send(res);
  await UserRepo.update(user._id, {
    isBanned: false,
    banExpiresAt: null,
  });
  return new SuccessMsgResponse('user unbanned successfully').send(res);
});
