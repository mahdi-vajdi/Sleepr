import { UserDto } from '@app/common';

export class ReservationQuery {
  constructor(
    public readonly user: UserDto,
    public readonly reservationId: string,
  ) {}
}
