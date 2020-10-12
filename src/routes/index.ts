import { Router } from 'express';

import appointmentsRouter from './appointments.routes';

const routes = Router();

/* Metodologia utilizada para identificar rotas referentes cada parte da aplicação. */
routes.use('/appointments', appointmentsRouter);

export default routes;
