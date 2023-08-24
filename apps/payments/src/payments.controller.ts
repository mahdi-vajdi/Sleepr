import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  CreateChargeMessage,
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async createCharge(data: CreateChargeMessage) {
    return this.paymentsService.createCharge(data);
  }
}
