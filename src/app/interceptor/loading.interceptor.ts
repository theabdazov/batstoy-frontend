import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoadingService} from '../modules/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.get('Background-Loading') && req.url.indexOf('assets') === -1) {
      this.loadingService.show();
      return next.handle(req).pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
    } else {
      req.headers.delete('Background-Loading');
      return next.handle(req);
    }

  }
}
