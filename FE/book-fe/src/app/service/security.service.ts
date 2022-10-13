import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {
  API_URL = 'http://localhost:8080/api/user';
  private user = new BehaviorSubject({});
  currentUser = this.user.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  changeUser(user: User) {
    this.user.next(user);
  }

  findByUser(username: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '?username=' + username);
  }
}
