import {Connection} from "mongoose";
import { DonationSchema } from "./schemas/donation.schema";

export const donationProviders = [
    {
        provide: 'DONATION_MODEL',
        useFactory: (connection: Connection) => connection.model('Donation', DonationSchema),
        inject: ['DATABASE_CONNECTION'],
      }
]