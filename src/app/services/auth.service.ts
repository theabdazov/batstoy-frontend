import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserCredentials, UserWithToken} from '../interfaces/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject<UserWithToken>(null);

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const tmpUser = this.localStorageService.getItem('authorizedUser');
    if (tmpUser != null) {
      this.currentUser.next(JSON.parse(tmpUser));
    }
  }

  login(user: UserCredentials): Observable<void> {
    return this.httpClient.post<UserWithToken>('/api/auth/login', user).pipe(
      map(res => {
        this.currentUser.next(res);
        this.localStorageService.setItem('authorizedUser', JSON.stringify(res));
        return null;
      })
    );
  }

  logout(): void {
    this.currentUser.next(null);
    this.localStorageService.removeItem('authorizedUser');
  }

}
