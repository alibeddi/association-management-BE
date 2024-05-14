import rateLimit from 'express-rate-limit';
import { MINUTE_ON_MILLISECOND } from '../constants/constants';

const limiter = rateLimit({
  windowMs: Number(process.env.LIMITER_BLOCK_TIME_MINUTE) * MINUTE_ON_MILLISECOND,
  max: Number(process.env.LIMITER_MAX_REQUESTS),
  message: `You have exceeded the ${process.env.LIMITER_MAX_REQUESTS} requests in ${process.env.LIMITER_BLOCK_TIME_MINUTE} minutes limit!`,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
