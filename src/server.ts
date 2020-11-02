import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes/index';
import uploadConfig from './config/upload';

import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
/*
  Visualizar as imagens que foram realizadas upload.
*/
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  /* Se o error foi originado pela minha propria aplicação. */
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  /* Se for uma error não reconhecido. */
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server Started');
});
