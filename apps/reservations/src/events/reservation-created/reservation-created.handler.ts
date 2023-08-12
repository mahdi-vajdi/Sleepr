import { EventsHandler } from '@nestjs/cqrs';
import { ReservationCreatedEvent } from './reservation-created.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ReservationCreatedEvent)
export class ReservationCreatedHandler
  implements IEventHandler<ReservationCreatedEvent>
{
  async handle({ reservationId }: ReservationCreatedEvent): Promise<void> {
    console.log(`Reservation Created: ${reservationId}`);
  }
}
