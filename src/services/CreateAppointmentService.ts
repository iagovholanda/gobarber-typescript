import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepositorie from '../repositories/AppointmentsRepositorie';

interface RequestAppointment {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  /* Metodo de execução */
  public async execute({
    date,
    provider,
  }: RequestAppointment): Promise<Appointment> {
    /* Libera os metodos para serem utilizado dentro dos services. */
    const appointmentsRepositorie = getCustomRepository(
      AppointmentsRepositorie,
    );

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepositorie.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    /* Cria a instancia */
    const appointment = appointmentsRepositorie.create({
      provider,
      date: appointmentDate,
    });

    /* Salva no banco de dados. */
    await appointmentsRepositorie.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
