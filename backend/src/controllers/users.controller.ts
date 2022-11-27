import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';
import { BadRequestError, UnauthorizedError } from 'restify-errors';

export default class UserControler {
  constructor(private userService = new UserService()) {}

  public userLogin = async (req: Request, res: Response) => {
    const { username, password } =  req.body
    if(!username || !password) throw new BadRequestError("O nome de usuário/senha não podem estar em vazios")
    const user = await this.userService.getUser(username);

    if(!user || user.password !== password ) {
      throw new BadRequestError('Usuário não existe ou senha inválida')
    }
    else{
    res.status(statusCodes.OK).json({message: 'Login Efetuado com sucesso', user: user.username})}
  }

  public createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await this.userService.createUser({username, password});
    res.status(statusCodes.CREATED).json(user)
  }
};