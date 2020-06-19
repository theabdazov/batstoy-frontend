import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RequestCacheService} from '../services/request-cache.service';


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has('Caching')) {
      const key = req.headers.get('Caching');
      req.headers.delete('Caching');
      const cachedResponse = this.cache.get(key);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(key, req, next, this.cache);
    } else {
      return next.handle(req);
    }
  }

  sendRequest(
    key: string,
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(key, event);
        }
      })
    );
  }
}
