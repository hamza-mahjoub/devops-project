import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class UsersService {

  backendUrl = null;

  constructor(private readonly httpService: HttpService,
    @InjectMetric("modules_metric") public modulesCounter: Counter<string>,
    private readonly configService: ConfigService) {
    this.backendUrl = `http://${configService.get('APP_AUTH_HOST')}:${configService.get('APP_AUTH_PORT')}`
  }

  async createUser(newUser, header) {
    this.modulesCounter.inc({ 'module_name': 'users' })
    return await lastValueFrom(
      this.httpService.post(`${this.backendUrl}/user`, { ...newUser }, { headers: { ...header } }
      ).pipe(
        map(res => res.data)
      )
    );
  }

  async login(data, header) {
    this.modulesCounter.inc({ 'module_name': 'auth' })

    return await lastValueFrom(
      this.httpService.post(`${this.backendUrl}/auth/login`, data, {
        headers: { ...header }
      }).pipe(
        map(res => res.data)
      )
    );
  }

  async me(headers) {
    this.modulesCounter.inc({ 'module_name': 'auth' })
    return await lastValueFrom(
      this.httpService.get(`${this.backendUrl}/profile`, {
        headers: {
          authorization: headers.authorization, 'X-Request-ID': headers['X-Request-ID']
        }
      }
      ).pipe(
        map(res => res.data)
      )
    );
  }

}