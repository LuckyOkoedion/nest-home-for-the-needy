import { VisitSchema } from "./schemas/visit.schema";
import { Connection } from "mongoose";

export const visitProviders = [
    {
        provide: 'VISIT_MODEL',
        useFactory: (connection: Connection) =>
          connection.model('Visit', VisitSchema),
        inject: ['DATABASE_CONNECTION'],
      }
]