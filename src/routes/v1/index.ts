import express from 'express';
import auth from './auth/auth';
import profile from './user/profile';
import users from './user/user';
import media from './media/media';
import email from './email/email';
import userType from './userType/userType';
import country from './country/country';

const router = express.Router();

// routes doesn't require authentication
router.use('/media', media);

// routes require authentication
router.use('/auth', auth);
router.use('/profile', profile);
router.use('/users', users);
router.use('/email', email);
router.use('/usertypes', userType);
router.use('/countries', country);

export default router;
