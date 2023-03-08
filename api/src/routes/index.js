import express from 'express';
import userRouter from './user.route.js';
import mediaRouter from './media.route.js';
import personRouter from './person.route.js';
import reviewRouter from './reivew.route.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/person', personRouter);
router.use('/reviews', reviewRouter);
router.use('/:mediaType', mediaRouter);

export default router;
