import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
    mediaFolderName: Joi.string().optional(),
  }),
  profile: Joi.object().keys({
    name: Joi.string().optional().min(1).max(200),
    lastname: Joi.string().optional().min(1).max(200),
    profilePicUrl: Joi.string().optional().uri(),
  }),
  create: Joi.object().keys({
    name: Joi.string().required().min(1).max(200),
    lastname: Joi.string().min(1).max(200).empty(''),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().optional().min(1).max(15).empty(''),
    password: Joi.string().required(),
    profilePicUrl: Joi.string().optional().uri(),
    role: Joi.array().items(Joi.string()).required(),
    verified: Joi.boolean().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().min(1).max(200),
    lastname: Joi.string().min(1).max(200),
    email: Joi.string().email(),
    phoneNumber: Joi.string().optional().min(1).max(15),
    password: Joi.string(),
    profilePicUrl: Joi.string().optional().uri(),
    role: Joi.array().items(Joi.string()),
    verified: Joi.boolean(),
  }),
  banUser: Joi.object().keys({
    banExpiresAt: Joi.date().optional(),
  }),
};
