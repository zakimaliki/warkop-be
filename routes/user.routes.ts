import { Router } from 'express';
import { UserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// Protected routes
router.post('/', userController.createUser.bind(userController));
router.get('/:id', userController.getUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router; 