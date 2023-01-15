import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { UsersModule } from './users/users.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        PrometheusModule.register(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get('CONNECTION_STRING'),
          }),
          inject: [ConfigService],
        })],
      controllers: [AppController],
      providers: [AppService,
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
        }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
