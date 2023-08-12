import {
  CreateChargeDto,
  EntityFactory,
  PAYMENTS_SERVICE,
  UserDto,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from './Reservation';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { ReservationEntityRepository } from '../repositories/reservation-entity.repository';
import { ReservationCreatedEvent } from '../events/reservation-created/reservation-created.event';
import { Types } from 'mongoose';

@Injectable()
export class ReservationFactory implements EntityFactory<Reservation> {
  constructor(
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
    private readonly reservationEntityRepository: ReservationEntityRepository,
  ) {}
  create(
    startDate: Date,
    endDate: Date,
    charge: CreateChargeDto,
    userDto: UserDto,
  ): Observable<Promise<Reservation>> {
    return this.paymentsService
      .send('create_charge', {
        ...charge,
        email: userDto.email,
      })
      .pipe(
        map(async (res) => {
          console.log('payment service response: ' + JSON.stringify(res));
          const reservation = new Reservation(
            new Types.ObjectId().toHexString(),
            new Date(),
            startDate,
            endDate,
            userDto._id,
            res.id,
          );
          console.log(
            'reservation.factory -> reservation object:' +
              JSON.stringify(reservation),
          );
          await this.reservationEntityRepository.create(reservation);
          reservation.apply(ReservationCreatedEvent);
          return reservation;
        }),
      );
  }
}
