import express from 'express';
import userRouter from './user.route.js';
import postRouter from './post.route.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter)

export default router;