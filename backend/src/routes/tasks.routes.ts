import { Router } from 'express';
import TaskControler from '../controllers/tasks.controller';

const router = Router();

const taskController = new TaskControler();

router.get('/users/:userId/tasks', taskController.getTasks);
router.get('/users/:userId/tasks/:taskId', taskController.getTask);
router.post('/users/:userId/tasks', taskController.create)
router.put('/users/:userId/tasks/:taskId', taskController.update)
router.delete('/users/:userId/tasks/:taskId', taskController.remove)

export default router;