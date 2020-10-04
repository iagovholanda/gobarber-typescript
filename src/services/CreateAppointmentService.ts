import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepositorie from '../repositories/AppointmentsRepositorie';

/* DTO */
interface RequestAppointment {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepositorie: AppointmentsRepositorie;

  constructor(appointmentsRepositorie: AppointmentsRepositorie) {
    this.appointmentsRepositorie = appointmentsRepositorie;
  }

  /* Metodo de execução */
  public execute({ date, provider }: RequestAppointment): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepositorie.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepositorie.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
