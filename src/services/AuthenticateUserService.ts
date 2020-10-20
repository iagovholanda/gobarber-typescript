import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface UserResponse {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<UserResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    /* Verificação de senhas do usuário. */
    const passwrodMatched = await compare(password, user.password);

    if (!passwrodMatched) {
      throw new Error('Incorrect email/password combination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
