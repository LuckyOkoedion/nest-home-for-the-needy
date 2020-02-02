import { AboutPageSchema } from "./schemas/about-page.schema";
import { Connection } from 'mongoose';

export const aboutPageProviders = [
    {
        provide: 'ABOUT_PAGE_MODEL',
        useFactory: (connection: Connection) => connection.model('AboutPage', AboutPageSchema),
        inject: ['DATABASE_CONNECTION'],
      }
    
]