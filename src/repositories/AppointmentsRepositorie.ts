import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

/* Repository<Appointment> -> Parametro de uma tipagem */

@EntityRepository(Appointment)
class AppointmentsRepositorie extends Repository<Appointment> {
  /* Verificação de Datas */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepositorie;
