import { CreateReservationHandler } from './create-reservation/create-reservation.handler';
import { ExtendReservationHandler } from './extend-reservation-endDate/extend-reservation.handler';

export const ReservationCommandHandlers = [
  CreateReservationHandler,
  ExtendReservationHandler,
];
