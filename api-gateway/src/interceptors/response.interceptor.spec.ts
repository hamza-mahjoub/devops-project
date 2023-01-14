import { Counter } from 'prom-client';
import { ResponseInterceptor } from './response.interceptor';

describe('ResponseInterceptor', () => {
  const counter = new Counter<string>({ name: "counter", help: "a counter" });

  it('should be defined', () => {
    expect(new ResponseInterceptor(counter)).toBeDefined();
  });
});
