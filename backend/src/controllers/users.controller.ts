import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';

export default class UserControler {
  constructor(private userService = new UserService()) {}

  public getUser = async (req: Request, res: Response) => {
    const { username } = req.body
    const user = await this.userService.getUser(username);
    res.status(statusCodes.OK).json(user)
  }

  public createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await this.userService.createUser({username, password});
    res.status(statusCodes.CREATED).json(user)
  }

  public updateUser = async (req: Request, res:Response) =>{
    const id = Number(req.params.id);
    const user = req.body
    await this.userService.updateUser(id,user)
    res.status(statusCodes.NO_CONTENT).end();
  }
}