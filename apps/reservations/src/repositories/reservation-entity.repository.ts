import { EntityRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Reservation } from '../models/Reservation';
import { ReservationSchema } from '../models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationSchemaFactory } from '../models/reservation-schema.factory';
import { Model } from 'mongoose';

@Injectable()
export class ReservationEntityRepository extends EntityRepository<
  ReservationSchema,
  Reservation
> {
  constructor(
    @InjectModel(ReservationSchema.name)
    reservationModel: Model<ReservationSchema>,
    reservationSchemaFactory: ReservationSchemaFactory,
  ) {
    super(reservationModel, reservationSchemaFactory);
  }

  async findReservation(
    reservationId: string,
    userId: string,
  ): Promise<Reservation> {
    return this.findOne({ _id: reservationId, userId });
  }

  async updateReservation(
    reservationId: string,
    userId: string,
    reservationEntity: Reservation,
  ) {
    this.findOneAndReplace({ _id: reservationId, userId }, reservationEntity);
  }
}
