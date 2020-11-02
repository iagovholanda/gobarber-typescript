import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  /* Validação do token */
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  /*
    O espaço em branco indica que eu não vou utilizar o primeira variavel passada.
    Além disso, essa função vai separar o Bearer do token passado e retornar apenas o token.
  */
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    /* Forçar o tipo de uma variavel. */
    const { sub } = decoded as TokenPayload;

    /* Id do usuário dentro da requisição. */
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
