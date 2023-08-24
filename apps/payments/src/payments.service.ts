import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import {
  CreateChargeMessage,
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private notificationsService: NotificationServiceClient;
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE_NAME)
    private readonly notificationsClient: ClientGrpc,
  ) {}

  async createCharge({ amount, email }: CreateChargeMessage) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    //   // payment_method: 'pm_card_visa',
    // });
    // console.log('payment method: ', paymentMethod);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      payment_method: 'pm_card_visa',
      // payment_method: paymentMethod.id,
      confirm: true,
    });

    if (!this.notificationsService) {
      this.notificationsService =
        this.notificationsClient.getService<NotificationServiceClient>(
          NOTIFICATION_SERVICE_NAME,
        );
    }

    this.notificationsService
      .notifyEmail({
        email,
        text: `Your payment of $${amount} has completed successfully`,
      })
      .subscribe(() => {
        // Not implemented
      });

    return paymentIntent;
  }
}
