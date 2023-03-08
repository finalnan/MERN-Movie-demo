import express from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/review.controller.js';
import jwtMiddleware from '../middlewares/jwt.middleware.js';
import requestHandler from '../handlers/request.handler.js';

const router = express.Router({ mergeParams: true });

router.get('/', jwtMiddleware.auth, reviewController.getReviewOfUser);

router.post(
  '/',
  jwtMiddleware.auth,
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('mediaId can not be empty'),
  body('content')
    .exists()
    .withMessage('content is required')
    .isLength({ min: 1 })
    .withMessage('content can not be empty'),
  body('mediaType')
    .exists()
    .withMessage('mediaType is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('invalid mediaType!'),
  body('mediaTitle').exists().withMessage('mediaTitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  requestHandler.validate,
  reviewController.create
);

router.delete('/:reviewId', jwtMiddleware.auth, reviewController.remove);

export default router;
