import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationSchema } from '../models/reservation.schema';
import { QueryReservationDto } from '../dto/query-reservation.dto';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationDtoRepository {
  constructor(
    @InjectModel(ReservationSchema.name)
    private readonly reservationModel: Model<ReservationSchema>,
  ) {}

  async findAll(user: UserDto): Promise<QueryReservationDto[]> {
    const reservations = await this.reservationModel.find(
      {},
      {},
      { lean: true },
    );
    return reservations.map((reservation) => {
      return {
        reservationId: reservation._id,
        reservedAt: reservation.timestamp,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        user,
        invoiceId: reservation.invoiceId,
      };
    });
  }

  async findOne(
    user: UserDto,
    reservationId: string,
  ): Promise<QueryReservationDto> {
    const reservation = await this.reservationModel.findOne({
      _id: reservationId,
    });
    return {
      reservationId: reservation._id,
      reservedAt: reservation.timestamp,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      user,
      invoiceId: reservation.invoiceId,
    };
  }
}
