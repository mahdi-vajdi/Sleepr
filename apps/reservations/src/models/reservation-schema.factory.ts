import { EntitySchemaFactory } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ReservationSchema } from './reservation.schema';
import { Reservation } from './Reservation';
import { Types } from 'mongoose';

@Injectable()
export class ReservationSchemaFactory
  implements EntitySchemaFactory<ReservationSchema, Reservation>
{
  create(entity: Reservation): ReservationSchema {
    return {
      _id: new Types.ObjectId(entity.getId()),
      timestamp: entity.getTimestamp(),
      startDate: entity.getStartDate(),
      endDate: entity.getEndDate(),
      userId: entity.getUserId(),
      invoiceId: entity.getInvoiceId(),
    };
  }
  createFromSchema(entitySchema: ReservationSchema): Reservation {
    return new Reservation(
      entitySchema._id.toHexString(),
      entitySchema.timestamp,
      entitySchema.startDate,
      entitySchema.endDate,
      entitySchema.userId,
      entitySchema.invoiceId,
    );
  }
}
