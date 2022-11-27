import { Router } from 'express';
import TaskControler from '../controllers/tasks.controller';
import ValidateJWT from '../auth/validateJWT';

const router = Router();

const validateJWT = new ValidateJWT()

const taskController = new TaskControler();

router.get('/users/:userId/tasks', validateJWT.tokenAuth,taskController.getTasks);
router.get('/users/:userId/tasks/:taskId',validateJWT.tokenAuth, taskController.getTask);
router.post('/users/:userId/tasks',validateJWT.tokenAuth, taskController.create)
router.put('/users/:userId/tasks/:taskId',validateJWT.tokenAuth, taskController.update)
router.delete('/users/:userId/tasks/:taskId',validateJWT.tokenAuth, taskController.remove)

export default router;