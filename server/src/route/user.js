import express from 'express';
import { UserController } from '../controller/index.js';
import { UserMiddleware } from '../middleware/index.js';

const router = express.Router();

router.get('/users', UserController.users);
router.get('/users/:id', UserController.user);
router.get('/userscount', UserController.getUsersCount);
router.post('/users', UserController.create);
router.delete('/users/:id', UserMiddleware.deleteUser, UserController.destroy);

export default router;
