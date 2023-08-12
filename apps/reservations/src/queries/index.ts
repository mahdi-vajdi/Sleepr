import { ReservationHandler } from './get-reservation/get-reservation.handler';
import { ReservationsHandler } from './get-reservations/get-reservations.handler';

export const ReservationQueryHandlers = [
  ReservationsHandler,
  ReservationHandler,
];
