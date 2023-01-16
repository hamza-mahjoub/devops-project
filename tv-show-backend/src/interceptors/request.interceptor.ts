import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { randomUUID } from 'crypto';
import { Counter } from 'prom-client';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {

  private readonly logger = new Logger(RequestInterceptor.name);

  constructor(@InjectMetric("requests_metric") public requestsCounter: Counter<string>) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();

    if (!request.headers['x-request-id']) { 
      request.headers["x-request-id"] = randomUUID()
    }

    this.logger.log(`Request { ${request.headers["x-request-id"]}, ${request.route.path}, ${request.method} }, Client_ip ${request.ip}`)
    if (request.route.methods.get && request.route.path !== '/metrics') {
      this.requestsCounter.inc({ "requests_count": "total" })
      this.requestsCounter.inc({ "http_route": request.route.path })
    }

    return next.handle();
  }
}
