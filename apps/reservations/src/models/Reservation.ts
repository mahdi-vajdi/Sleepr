import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Reservation extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly timestamp: Date,
    private readonly startDate: Date,
    private endDate: Date,
    private readonly userId: string,
    private readonly invoiceId: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getTimestamp(): Date {
    return new Date(this.timestamp);
  }

  getStartDate(): Date {
    return new Date(this.startDate);
  }

  getEndDate(): Date {
    return new Date(this.endDate);
  }

  getUserId(): string {
    return this.userId;
  }

  getInvoiceId(): string {
    return this.invoiceId;
  }

  extendEndDate(newEndDate: Date): void {
    if (newEndDate < this.endDate)
      throw new BadRequestException(
        'The new end date is not after the current end date',
      );
    this.endDate = newEndDate;
  }
}
