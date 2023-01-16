import { HttpService } from '@nestjs/axios';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { randomUUID } from 'crypto';
import { Counter } from 'prom-client';
import { lastValueFrom, map, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {


    backendUrl = null;

    private readonly logger = new Logger(AuthInterceptor.name);

    constructor(@InjectMetric("modules_metric") public modulesCounter: Counter<string>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService) {
        this.backendUrl = `http://${configService.get('APP_AUTH_HOST')}:${configService.get('APP_AUTH_PORT')}`
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();

        if (!request.headers['X-Request-ID']) {
            request.headers["X-Request-ID"] = randomUUID()
        }

        this.modulesCounter.inc({ 'module_name': 'auth' })

        if (request.headers.authorization) {
            const user = await lastValueFrom(
                this.httpService.get(`${this.backendUrl}/profile`, {
                    headers: {
                        authorization: request.headers.authorization, 'X-Request-ID': request.headers['X-Request-ID']
                    }
                }
                ).pipe(
                    map(res => res.data)
                )
            );

            if (user)
                return next.handle();
            else
                return throwError(() => new Error('Invalid Token'))
        } else {
            return throwError(() => "unathorized");
        }


    }
}
