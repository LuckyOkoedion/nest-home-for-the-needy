import { HomePageSchema } from "./schemas/home-page.schema";
import {Connection} from "mongoose";

export const homePageProviders = [
    {
        provide: 'HOME_PAGE_MODEL',
        useFactory: (connection: Connection) => connection.model('HomePage', HomePageSchema),
        inject: ['DATABASE_CONNECTION'],
      }
]