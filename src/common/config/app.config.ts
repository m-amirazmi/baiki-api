import * as process from 'node:process';
import { registerAs, ConfigType } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'NestApp',
  env: process.env.APP_ENV || 'production',
  debug: process.env.APP_DEBUG === 'true',
  timezone: process.env.APP_TIMEZONE || 'UTC',
  locale: process.env.APP_LOCALE || 'en',
}));

export type AppConfigType = ConfigType<typeof appConfig>;
