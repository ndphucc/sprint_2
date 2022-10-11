import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  API_URL = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {
  }

  getAll(idType: number, search: string, page: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/list?idType=' + idType + '&search=' + search + '&page=' + page);
  }

  findById(id: number): Observable<Book> {
    return this.http.get<Book>(this.API_URL + '/' + id);
  }
}
