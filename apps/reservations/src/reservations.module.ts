import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import {
  DatabaseModule,
  LoggerModule,
  AUTH_SERVICE,
  PAYMENTS_SERVICE,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { ReservationEntityRepository } from './repositories/reservation-entity.repository';
import { ReservationSchemaFactory } from './models/reservation-schema.factory';
import { ReservationFactory } from './models/reservation.factory';
import { ReservationSchema } from './models/reservation.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { ReservaionEventHandlers } from './events';
import { ReservationQueryHandlers } from './queries';
import { ReservationDtoRepository } from './repositories/reservation-dto.repository';
import { ReservationCommandHandlers } from './commands';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationSchema.name,
        schema: SchemaFactory.createForClass(ReservationSchema),
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('PAYMENTS_HOST'),
            port: configService.get('PAYMENTS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationEntityRepository,
    ReservationDtoRepository,
    ReservationSchemaFactory,
    ReservationFactory,
    ...ReservationCommandHandlers,
    ...ReservaionEventHandlers,
    ...ReservationQueryHandlers,
  ],
})
export class ReservationsModule {}
