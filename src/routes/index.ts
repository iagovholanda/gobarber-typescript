import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

/* Metodologia utilizada para identificar rotas referentes cada parte da aplicação. */
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
