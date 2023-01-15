import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
