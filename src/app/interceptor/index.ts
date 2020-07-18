import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CachingInterceptor} from './caching-interceptor';
import {HandlerErrorInterceptor} from './handler-error.interceptor';
import {LoadingInterceptor} from './loading.interceptor';
import {HeadersInterceptor} from './headers.interceptor';
import {JwtInterceptor} from './jwt.interceptor';

export const InterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HandlerErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
];
