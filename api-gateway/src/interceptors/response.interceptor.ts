import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  constructor(@InjectMetric("requests_metric") public requestsCounter: Counter<string>) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const response = context.switchToHttp().getResponse();
    response.set({ 'X-Request-ID': request.headers['X-Request-ID'] })

    return next
      .handle()
      .pipe(
        catchError(err => {
          if (request.route.methods.get && request.route.path !== '/metrics')
            this.requestsCounter.inc({ "requests_count": "failure" });
          return err
        }),
        map(data => {
          if (request.route.methods.get && request.route.path !== '/metrics')
            this.requestsCounter.inc({ "requests_count": "success" });
          return data
        }),
      );
  }
}
