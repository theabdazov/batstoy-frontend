import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserAdding, UserFilter} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/users';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAll(userFilter: UserFilter) {
    // @ts-ignore
    return this.httpClient.get<User[]>(this.url, {params: userFilter});
  }

  create(user: UserAdding) {
    return this.httpClient.post<User>(this.url, user);
  }

  update(userId: number, user: UserAdding) {
    return this.httpClient.patch<User>(`${this.url}/${userId}`, user);
  }

  getById(userId: number) {
    return this.httpClient.get<User>(`${this.url}/${userId}`);
  }

  deleteById(userId: number) {
    return this.httpClient.delete<User>(`${this.url}/${userId}`);
  }

}
