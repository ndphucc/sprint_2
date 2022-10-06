import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {
  API_URL = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {
  }

  save(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + '/create', user);
  }

  findByUser(username: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '?username=' + username);
  }
}
