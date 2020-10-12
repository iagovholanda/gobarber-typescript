import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepositorie from '../repositories/AppointmentsRepositorie';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepositorie = new AppointmentsRepositorie();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepositorie.index();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    /* Chamando o services no qual foi desenvolvido, instanciando e recebendo um
    valor do tipo referenciado dentro da classe. */
    const createAppointment = new CreateAppointmentService(
      appointmentsRepositorie,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
