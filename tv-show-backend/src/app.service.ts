import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // default service
  getHello(): string {
    return 'Hello World!';
  }
}
