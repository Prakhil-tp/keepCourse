import express from 'express';
import { ensureToken } from '../middlewares';
import { courseRouter } from './courses';
import { authRouter } from './auth';

const router = express.Router();

router.use('/courses',ensureToken, courseRouter);
router.use('/auth', authRouter);

export { router as apiRouter };