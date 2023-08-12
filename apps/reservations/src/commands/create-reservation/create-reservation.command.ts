import { UserDto } from '@app/common';
import { CreateReservationDto } from 'apps/reservations/src/dto/create-reservation.dto';

export class CreateReservationCommand {
  constructor(
    public readonly createReservationDto: CreateReservationDto,
    public readonly user: UserDto,
  ) {}
}
