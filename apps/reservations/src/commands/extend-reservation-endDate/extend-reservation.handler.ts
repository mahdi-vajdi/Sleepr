import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ExtendReservationCommand } from './extend-reservation.command';
import { ReservationEntityRepository } from 'apps/reservations/src/repositories/reservation-entity.repository';

@CommandHandler(ExtendReservationCommand)
export class ExtendReservationHandler
  implements ICommandHandler<ExtendReservationCommand>
{
  constructor(
    private readonly reservationEntityRepository: ReservationEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    reservationId,
    userId,
    newEndDate,
  }: ExtendReservationCommand): Promise<void> {
    const reservation = this.eventPublisher.mergeObjectContext(
      await this.reservationEntityRepository.findReservation(
        reservationId,
        userId,
      ),
    );

    reservation.extendEndDate(newEndDate);

    await this.reservationEntityRepository.updateReservation(
      reservationId,
      userId,
      reservation,
    );

    reservation.commit();
  }
}
