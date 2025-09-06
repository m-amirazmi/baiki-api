import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbConfigType } from './common/config/db.config';
import { AppConfigType } from './common/config/app.config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): string {
    const dbConfig = this.config.get<DbConfigType>('db');
    const appConfig = this.config.get<AppConfigType>('app');

    return 'Hello World!';
  }
}
