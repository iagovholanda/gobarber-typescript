import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      /* Deletar avatar anterior. */
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      /*
        Utilizando a função direto do File System, utilizando promises e verificando
        a existencia do arquivo com o stat.
      */
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      /*
        Caso o arquivo exista o mesmo é deletado.
      */
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    /*
      Para acessar as informações do usuário referido basta receber o user
      e passar o valor da imagem que deve ser alterado. Esta informação do
      usuário, são recebidas ao por meio da variavel 'user'.
    */
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
