import { isEqual } from "date-fns";
import Appointment from "../models/appointment";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepositorie {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /* Listagem de Agendamentos */
  public index(): Appointment[] {
    return this.appointments;
  }

  /* Verificação de Datas */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepositorie;
