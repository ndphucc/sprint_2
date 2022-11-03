import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {User} from '../model/User';

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

  findTop(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL + '/top');
  }

  save(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL + '/create', book);
  }

  delete(id: number): Observable<Book> {
    return this.http.delete<Book>(this.API_URL + '/' + id);
  }

  statisticalBook(type: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL + '/statistical/book/' + type);
  }

  statisticalCustomer(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/statistical/customer');
  }
}
