import UserRepository from '../../database/mongodb/repositories/user.repository';
import JwtHelper from '../../utils/jwtHelper';
import { ErrorHandler } from '../../utils/errorHandler';
import { HttpCode } from '../../utils/httpCode';
import { TokenEnum } from '../../constants/constants';
import { sendMail } from '../../utils/sendMail';
import path from 'path';
import fs from 'fs';
import logger from '../../utils/logger';
import { Types } from 'mongoose';
import IUser from '../../database/mongodb/models/user.model';

const login = async (email: string, password: string) => {
  const options = { email };

  const user = await UserRepository.getOneByQuery(options);

  if (!user) {
    throw new ErrorHandler('No user found', HttpCode.NOT_FOUND);
  }

  const matched = await JwtHelper.PasswordCompare(password, user?.password);

  if (!matched) {
    throw new ErrorHandler('Invalid credentials', HttpCode.BAD_REQUEST);
  }

  const payload: TokenData = {
    id: user?._id,
  };

  const token = JwtHelper.GenerateToken(payload, TokenEnum.access);

  const refreshToken = JwtHelper.GenerateToken(payload, TokenEnum.refresh);

  user.password = undefined;

  return { user, token, refreshToken };
};

const register = async (name: string, email: string, password: string) => {
  let exists = await UserRepository.getOneByQuery({ email });

  if (exists) {
    throw new ErrorHandler('Email already in use!', HttpCode.FORBIDDEN);
  }

  password = await JwtHelper.PasswordHashing(password);

  const user = await UserRepository.create({ name, password, email });

  const payload: TokenData = {
    id: user?._id,
  };

  const token = JwtHelper.GenerateToken(payload, TokenEnum.access);

  const refreshToken = JwtHelper.GenerateToken(payload, TokenEnum.refresh);

  user.password = undefined;

  return { user, token, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  const decoded = JwtHelper.ExtractToken(refreshToken, TokenEnum.refresh);

  if (!decoded) {
    throw new ErrorHandler('Invalid Token!', HttpCode.UNAUTHORIZED);
  }

  const payload: TokenData = {
    id: decoded?.id,
  };

  const token = JwtHelper.GenerateToken(payload, TokenEnum.access);

  return token;
};

const forgotPassword = async (email: string) => {
  const user = await UserRepository.getOneByQuery({ email });

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  const payload: TokenData = {
    id: user?._id,
  };

  const resetToken = JwtHelper.GenerateToken(payload, TokenEnum.reset);

  let resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const subject = 'Verify your account';

  const body = `
		<h1>Your password reset token is as follow:</h1>
		<a href="${resetUrl}">${resetUrl}</a>
		<hr />
	  <p>If you have not requested this email, then ignore it.</p>
	`;

  await sendMail(user?.email, subject, body);

  return { email: user?.email };
};

const resetPassword = async (resetToken: string, password: string, confirmPassword: string) => {
  const decoded = JwtHelper.ExtractToken(resetToken, TokenEnum.reset);

  const user = await UserRepository.getOneByQuery({ _id: decoded?.id });

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  if (password !== confirmPassword) {
    throw new ErrorHandler('password does not match!', HttpCode.BAD_REQUEST);
  }

  const newPassword = await JwtHelper.PasswordHashing(password);

  await UserRepository.edit(user?._id, { password: newPassword });

  return { email: user?.email };
};

const getUserProfile = async (id: Types.ObjectId) => {
  const user = await UserRepository.getOneByQuery({ _id: id });

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  return user;
};

const updateProfile = async (id: Types.ObjectId, name: string, email: string) => {
  const user = await UserRepository.getOneByQuery({ _id: id });

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  if (name) user.set('name', name);

  if (email) user.set('email', email);

  const updatedUser = {
    name,
    email,
  };

  await UserRepository.edit(id, updatedUser);

  user.password = undefined;

  return user;
};

const updateUserPassword = async (
  id: Types.ObjectId,
  oldPassword: string,
  password: string,
  confirmPassword: string,
) => {
  const user = await UserRepository.getOneByQuery({ _id: id });

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }
  const matched = await JwtHelper.PasswordCompare(oldPassword, user?.password);

  if (!matched) {
    throw new ErrorHandler('Invalid credentials', HttpCode.BAD_REQUEST);
  }

  if (password !== confirmPassword) {
    throw new ErrorHandler('password does not match!', HttpCode.BAD_REQUEST);
  }

  const newPassword = await JwtHelper.PasswordHashing(password);

  await UserRepository.edit(id, { password: newPassword });

  user.password = undefined;

  return user;
};

const avatarUpload = async (id: Types.ObjectId, filename: string) => {
  if (!filename) {
    throw new ErrorHandler('upload error!', HttpCode.BAD_REQUEST);
  }

  const user = await UserRepository.getById(id);

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  // let imagePath = path.join(__dirname, '..', '..', 'public', 'users', user?.avatar);

  // if (fs.existsSync(imagePath) && user?.avatar !== 'default-user.png') {
  //   await fs.unlink(imagePath, async (err: Error) => {
  //     logger.info('user photo deleted successfully');
  //   });
  // }

  const updatedUser = await UserRepository.edit(id, { avatar: filename });

  return updatedUser;
};

const getAllUsers = async (name: string, page: number, pageSize: number) => {
  const options = {
    page: page,
    limit: pageSize,
  };

  const { docs, ...meta } = await UserRepository.getAll({}, options, { name });

  return { docs, meta };
};

const getUserById = async (id: Types.ObjectId) => {
  const user = await UserRepository.getById(id);

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  return user;
};

const createUser = async (item: IUser) => {
  const createdUser = await UserRepository.create(item);

  return createdUser;
};

const updateUser = async (id: Types.ObjectId, item: IUser) => {
  const user = await UserRepository.getById(id);

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  const updatedUser = await UserRepository.edit(id, item);

  return updatedUser;
};

const deleteUser = async (id: Types.ObjectId) => {
  const user = await UserRepository.getById(id);

  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  await UserRepository.remove(id);

  return user;
};

export default {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  updateUserPassword,
  avatarUpload,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
