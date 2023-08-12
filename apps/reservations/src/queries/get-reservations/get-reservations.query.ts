import { UserDto } from '@app/common';

export class ReservationsQuery {
  constructor(public readonly user: UserDto) {}
}
