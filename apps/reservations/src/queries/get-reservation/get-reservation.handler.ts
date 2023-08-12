import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReservationQuery } from './get-reservation.query';
import { ReservationDtoRepository } from '../../repositories/reservation-dto.repository';
import { QueryReservationDto } from 'apps/reservations/src/dto/query-reservation.dto';

@QueryHandler(ReservationQuery)
export class ReservationHandler
  implements IQueryHandler<ReservationQuery, QueryReservationDto>
{
  constructor(
    private readonly reservationDtoRepository: ReservationDtoRepository,
  ) {}
  execute({ user, reservationId }: ReservationQuery): Promise<any> {
    return this.reservationDtoRepository.findOne(user, reservationId);
  }
}
