import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ShowsModule } from './shows/shows.module';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ShowsModule,
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrometheusModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    makeCounterProvider({
      name: "requests_metric",
      help: "Counts number of processed requests",
      labelNames: ["requests_count", "http_route"]
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
})
export class AppModule { }
