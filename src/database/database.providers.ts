import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      if (process.env.NODE_ENV === 'test') {
        await mongoose.connect('mongodb://localhost/test-home-for-the-needy', {
          useNewUrlParser: true,
        });
      } else {
        return await mongoose.connect(
          'mongodb://localhost/home-for-the-needy',
          { useNewUrlParser: true },
        );
      }
    },
  },
];
