import {Connection} from "mongoose";
import { BlogPageSchema } from "./schemas/blog-page.schema";

export const blogPageProviders = [
    {
        provide: 'BLOG_PAGE_MODEL',
        useFactory: (connection: Connection) => connection.model('BlogPage', BlogPageSchema),
        inject: ['DATABASE_CONNECTION'],
      }

]