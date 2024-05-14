import express from 'express';
import userRoutes from './v1/user.route';

const router = express.Router();

router.use('/', userRoutes);

export default router;
