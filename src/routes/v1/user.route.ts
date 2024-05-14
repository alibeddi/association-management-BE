import express from 'express';

const router = express.Router();

import Authorization from '../../middlewares/auth';
import AuthorizeRole from '../../middlewares/authorizeRole';
import limiter from '../../middlewares/limiter';

import { multerConfig } from '../../utils/multer';
import multer from 'multer';

import UserController from '../../controllers/v1/user.controller';
import { RolesEnum } from '../../constants/constants';
import validator from '../../utils/validator';
import userValidator from './validators/user.validator';

router.post('/login', limiter, validator(userValidator.loginSchema), UserController.login);

router.post('/register', limiter, validator(userValidator.registerSchema), UserController.register);

router.get('/logout', Authorization.Authenticated, UserController.logout);

router.get('/refresh-token', UserController.refreshToken);

router.post(
  '/forgot-password',
  validator(userValidator.forgotPasswordSchema),
  UserController.forgotPassword,
);

router.put(
  '/reset-password/',
  validator(userValidator.resetPasswordSchema),
  UserController.resetPassword,
);

router.get('/profile', Authorization.Authenticated, UserController.getProfile);

router.put(
  '/profile-update',
  Authorization.Authenticated,
  validator(userValidator.updateProfileSchema),
  UserController.updateProfile,
);

router.put(
  '/profile-password-update',
  Authorization.Authenticated,
  validator(userValidator.updateProfilePasswordSchema),
  UserController.updateUserPassword,
);

router.post(
  '/avatar-upload',
  Authorization.Authenticated,
  multer(multerConfig).single('file'),
  UserController.avatarUpload,
);

router
  .route('/admin/users')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.getAllUsers,
  )
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.createUser,
  );

router
  .route('/admin/users/:id')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.getUserById,
  )
  .put(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.updateUser,
  )
  .delete(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.deleteUser,
  );

export default router;
