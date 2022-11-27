import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';
import { BadRequestError, UnauthorizedError } from 'restify-errors';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken'
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'JWT';

export default class UserControler {
  constructor(private userService = new UserService()) {}

  
  public userLogin = async (req: Request, res: Response) => {
    const { username, password } =  req.body
    if(!username || !password) throw new BadRequestError("O nome de usuário/senha não podem estar em vazios")
    const user = await this.userService.getUser(username);

    const comparePassword = await compare(password,user.passwordHash);
    
    if(!user || !comparePassword) {
      throw new UnauthorizedError('Usuário não existe ou senha inválida')
    }
    
    const token = jwt.sign({data: {username: username}},secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    res.status(statusCodes.OK).json({token})
  }

  public createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const passwordHash = await hash(password,8)
    const user = await this.userService.createUser({username, passwordHash});
    res.status(statusCodes.CREATED).json({message: "Usuário cadastrado com sucesso", user: user.username})
  }
};