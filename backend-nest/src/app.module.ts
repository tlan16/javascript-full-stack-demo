import { Module, CacheInterceptor, CacheModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
      CacheModule.register({
          store: redisStore,
          host: 'redis',
          port: 6379,
      }),
      DatabaseModule,
      CustomerModule,
  ],
  controllers: [AppController],
  providers: [
      {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
      },
      AppService,
  ],
})
export class AppModule {}
