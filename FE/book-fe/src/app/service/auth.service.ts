import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';

const AUTH_API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(obj): Observable<any> {
    return this.httpClient.post(AUTH_API + 'login', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<User>(AUTH_API + 'register', user, this.httpOptions);
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
