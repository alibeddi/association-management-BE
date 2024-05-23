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

export const banUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const banExpiresAt = req.body.banExpiresAt;
  if (banExpiresAt) {
    if (new Date(banExpiresAt) < new Date()) {
      return new BadRequestResponse(
        `banExpiresAt must be greater then current date : ${new Date().toDateString()}`,
      );
    }
  }

  const UserId = new Types.ObjectId(req.params.id);
  const user = await UserRepo.getOneById(UserId);
  if (!user) return new NotFoundResponse('no user found with that id').send(res);
  if (user.isBanned) return new BadRequestResponse('this user is already banned').send(res);
  await UserRepo.update(user._id, {
    isBanned: true,
    banExpiresAt: banExpiresAt ? banExpiresAt : null,
  });
  return new SuccessMsgResponse('user banned successfully').send(res);
});
