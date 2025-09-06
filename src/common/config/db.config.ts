import * as process from 'node:process';
import { registerAs, ConfigType } from '@nestjs/config';

type DbConfigReturnType = {
  type: 'postgres';
  url: string;
  entities: string[];
  migrations: string[];
  synchronize: boolean;
  migrationsRun: boolean;
  logging: boolean;
};

export const dbConfig = registerAs(
  'db',
  (): DbConfigReturnType => ({
    type: 'postgres',
    url: process.env.DB_URL || '',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    logging: process.env.DB_LOGGING === 'true',
  }),
);

export type DbConfigType = ConfigType<typeof dbConfig>;
