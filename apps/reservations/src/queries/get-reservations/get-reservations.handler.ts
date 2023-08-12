import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReservationsQuery } from './get-reservations.query';
import { ReservationDtoRepository } from '../../repositories/reservation-dto.repository';
import { QueryReservationDto } from '../../dto/query-reservation.dto';

@QueryHandler(ReservationsQuery)
export class ReservationsHandler
  implements IQueryHandler<ReservationsQuery, QueryReservationDto[]>
{
  constructor(
    private readonly reservationDtoRepository: ReservationDtoRepository,
  ) {}

  async execute({ user }: ReservationsQuery): Promise<QueryReservationDto[]> {
    return this.reservationDtoRepository.findAll(user);
  }
}
