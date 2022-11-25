import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';

export default class UserControler {
  constructor(private userService = new UserService()) {}

  public getUser = async (req: Request, res: Response) =>{
    const { username } = req.body
    const user = await this.userService.getUser(username);
    res.status(statusCodes.OK).json(user)

  }
}