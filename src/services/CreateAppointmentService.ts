import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepositorie from '../repositories/AppointmentsRepositorie';

interface RequestAppointment {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  /* Metodo de execução */
  public async execute({
    date,
    provider_id,
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
      throw new AppError('This appointment is already booked');
    }

    /* Cria a instancia */
    const appointment = appointmentsRepositorie.create({
      provider_id,
      date: appointmentDate,
    });

    /* Salva no banco de dados. */
    await appointmentsRepositorie.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
