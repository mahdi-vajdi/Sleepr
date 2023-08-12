export class ExtendReservationCommand {
  constructor(
    public readonly reservationId: string,
    public readonly userId: string,
    public readonly newEndDate: Date,
  ) {}
}
