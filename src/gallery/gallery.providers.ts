import {Connection} from "mongoose";
import { GallerySchema } from "./schemas/gallery.schema";

export const galleryProviders = [
    {
        provide: 'GALLERY_MODEL',
        useFactory: (connection: Connection) => connection.model('Gallery', GallerySchema),
        inject: ['DATABASE_CONNECTION'],
      }
]