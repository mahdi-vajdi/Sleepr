import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateReservationCommand } from './create-reservation.command';
import { ReservationFactory } from '../../models/reservation.factory';

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler
  implements ICommandHandler<CreateReservationCommand>
{
  constructor(
    private readonly reservationFactory: ReservationFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createReservationDto,
    user,
  }: CreateReservationCommand): Promise<void> {
    const { startDate, endDate, charge } = createReservationDto;
    this.reservationFactory
      .create(startDate, endDate, charge, user)
      .subscribe(async (response) => {
        const _reservation = await response;
        const reservation =
          this.eventPublisher.mergeObjectContext(_reservation);
        reservation.commit();
      });
  }
}
