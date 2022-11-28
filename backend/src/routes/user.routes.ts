import { Router } from 'express';
import UserControler from '../controllers/users.controller';

const router = Router();

const usersController = new UserControler();

router.post('/users', usersController.userLogin);
router.post('/users/create', usersController.createUser)

export default router;
