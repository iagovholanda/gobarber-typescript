import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepositorie from "../repositories/AppointmentsRepositorie";

const appointmentsRouter = Router();
const appointmentsRepositorie = new AppointmentsRepositorie();

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepositorie.index();
  return response.json(appointments);
});

appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepositorie.findByDate(
    parsedDate
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: "This appointment is already booked" });
  }

  const appointment = appointmentsRepositorie.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
