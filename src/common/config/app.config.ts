import * as process from 'node:process';
import { registerAs, ConfigType } from '@nestjs/config';

type AppConfigReturnType = {
  name: string;
  env: 'local' | 'development' | 'production' | 'testing';
  debug: boolean;
  timezone: string;
  locale: string;
};

export const appConfig = registerAs(
  'app',
  (): AppConfigReturnType => ({
    name: process.env.APP_NAME || 'NestApp',
    env: (process.env.APP_ENV as AppConfigReturnType['env']) || 'production',
    debug: process.env.APP_DEBUG === 'true',
    timezone: process.env.APP_TIMEZONE || 'UTC',
    locale: process.env.APP_LOCALE || 'en',
  }),
);

export type AppConfigType = ConfigType<typeof appConfig>;
