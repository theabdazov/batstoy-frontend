import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';

@Injectable()
export class HandlerErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let hideError = false;
    if (req.headers.get('Hide-Error')) {
      req.headers.delete('Hide-Error');
      hideError = true;
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.notificationService.error('Авторизуйтесь заново');
          this.router.navigate(['./authentication']);
        } else {
          if (!hideError) {
            this.notificationService.error('notification.requestError');
          }
        }

        return throwError(error);
      })
    );

  }

}
