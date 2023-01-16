import { Counter } from 'prom-client';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {

  it('should be defined', () => {
    const counter = new Counter<string>({ name: "counter", help: "a counter" });
 
    expect(new RequestInterceptor(counter)).toBeDefined();
  });
});
