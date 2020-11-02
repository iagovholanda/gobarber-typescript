import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
/*
  Visualizar as imagens que foram realizadas upload.
*/
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server Started');
});
