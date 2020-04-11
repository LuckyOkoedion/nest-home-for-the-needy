import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import passport = require('passport');
import * as bodyParser from "body-parser";

// const session = require('express-session');
// const redis = require('redis');
// const redisClient = redis.createClient();
// const redisStore = require('connect-redis')(session);
// const cookieParser = require('cookie-parser')

// redisClient.on('error', (err) => {
//   console.log('Redis error: ', err);
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule
    // , { bodyParser: false }
    );
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json())
  // Bring in session with redis


  // app.use(session({
  //   secret: process.env.SESSION_SECRET,
  //   name: process.env.COOKIE_NAME,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  //   store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
  // }));

  // app.use(cookieParser());
  app.use(passport.initialize());
  // app.use(passport.session());

  // Bring in global pipes
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen(3000);
}
bootstrap();
