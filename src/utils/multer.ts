import { Options, diskStorage } from 'multer';
import path, { resolve } from 'path';
import { MEGABYTE_IN_BYTE } from '../constants/constants';

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'public', 'users'),
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'public', 'users'));
    },
    filename: (request, file, callback) => {
      const filename =
        path.parse(file.originalname).name +
        '_' +
        Date.now() +
        '_' +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);

      callback(null, filename);
    },
  }),
  limits: {
    fileSize: Number(process.env.AVATAR_SIZE_IN_MEGABYTE) * MEGABYTE_IN_BYTE,
  },
  fileFilter: (request, file, callback) => {
    const formats = ['image/jpeg', 'image/jpg', 'image/png'];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
} as Options;
