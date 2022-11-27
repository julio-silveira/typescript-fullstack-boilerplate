import { Router } from 'express';
import UserControler from '../controllers/users.controller';

const router = Router();

const usersController = new UserControler();

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser)
router.put('/users/:id', usersController.updateUser)

export default router;