import * as process from 'node:process';
import { registerAs, ConfigType } from '@nestjs/config';

export const dbConfig = registerAs('db', () => ({
  connection: {
    postgres: {
      type: 'postgres' as const,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'app_db',
      entities: ['./../Models/*.entity{.ts,.js}'],
      migrations: ['./../database/migrations/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
      logging: process.env.DB_LOGGING === 'true',
    },
  },
}));

export type DbConfigType = ConfigType<typeof dbConfig>;
