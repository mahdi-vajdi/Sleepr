import { UserDto } from '@app/common';
import { Types } from 'mongoose';

export class QueryReservationDto {
  readonly reservationId: Types.ObjectId;
  readonly reservedAt: Date;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly user: UserDto;
  readonly invoiceId: string;
}
