import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import TaskServices from '../services/tasks.service';


export default class TaskControler {
  constructor(private taskServices = new TaskServices()) {}

  public getTasks = async  (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    console.log(userId);
    const tasks = await this.taskServices.findAllTasks(userId)
    res.status(statusCodes.OK).json(tasks)
  }

  public getTask = async  (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    const taskId = Number(req.params.taskId)
    const tasks = await this.taskServices.findOneTask(userId,taskId)
    res.status(statusCodes.OK).json(tasks)
  }

  public create = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    const tasksData = req.body
    const user = await this.taskServices.create({userId,...tasksData});
    res.status(statusCodes.CREATED).json(user)
  }

  public update = async (req: Request, res:Response) =>{
    const userId = Number(req.params.userId);
    const taskId = Number(req.params.taskId)
    const tasksData = req.body
    await this.taskServices.update(userId,taskId,{userId,...tasksData})
    res.status(statusCodes.NO_CONTENT).end();
  }

  public remove = async (req: Request, res:Response) =>{
    const userId = Number(req.params.userId);
    const taskId = Number(req.params.taskId)
    await this.taskServices.remove(userId,taskId)
    res.status(statusCodes.NO_CONTENT).end();
  }

};