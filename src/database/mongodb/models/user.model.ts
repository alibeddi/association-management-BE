import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const USER_DOCUMENT_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // avatar: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },

    // avatar: {
    //   type: Schema.Types.String,
    //   required: true,
    //   default: 'default-user.png',
    // },
    role: {
      type: Schema.Types.String,
      required: true,
      enum: [RolesEnum.admin, RolesEnum.user],
      default: RolesEnum.user,
    },
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const User = model<IUser, Pagination<IUser>>(
  USER_DOCUMENT_NAME,
  schema,
  USER_COLLECTION_NAME,
);
