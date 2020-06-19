import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.headers.has('File')) {
      req = req.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json'
          }
        }
      );
    } else {
      req.headers.delete('File');
    }
    return next.handle(req);
  }
}
