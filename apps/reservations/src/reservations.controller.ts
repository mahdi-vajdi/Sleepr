import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReservationCommand } from './commands/create-reservation/create-reservation.command';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { ReservationQuery } from './queries/get-reservation/get-reservation.query';
import { ReservationsQuery } from './queries/get-reservations/get-reservations.query';
import { ExtendReservationCommand } from './commands/extend-reservation-endDate/extend-reservation.command';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    console.log(
      `contoller:  createReservationDto : ${JSON.stringify(
        createReservationDto,
      )} charge: ${JSON.stringify(createReservationDto)}`,
    );
    await this.commandBus.execute<CreateReservationCommand, void>(
      new CreateReservationCommand(createReservationDto, user),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: UserDto): Promise<QueryReservationDto[]> {
    return this.queryBus.execute<ReservationsQuery, QueryReservationDto[]>(
      new ReservationsQuery(user),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentUser() user: UserDto, @Param('id') id: string) {
    return this.queryBus.execute<ReservationQuery, QueryReservationDto>(
      new ReservationQuery(user, id),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') reservationId: string,
    @CurrentUser() { _id }: UserDto,
    @Body() { endDate }: UpdateReservationDto,
  ) {
    await this.commandBus.execute<ExtendReservationCommand, void>(
      new ExtendReservationCommand(reservationId, _id, endDate),
    );
  }
}
