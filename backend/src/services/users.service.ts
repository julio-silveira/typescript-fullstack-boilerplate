import User from '../interfaces/user.interface';
import Users from '../database/models/UserModel';

export default class UserService {
  public usersModel = Users;

  public async getUser(username: string): Promise<User[]> {
    const user = await this.usersModel.findOne({ where: { username }, raw: true});
    return user as any
  }
}