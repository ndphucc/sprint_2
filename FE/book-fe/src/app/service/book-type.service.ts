import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookType} from '../model/book-type';

@Injectable({
  providedIn: 'root'
})
export class BookTypeService {
  API_URL = 'http://localhost:8080/api/typeBook';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<BookType[]> {
    return this.http.get<BookType[]>(this.API_URL + '/list');
  }

  findById(id: number): Observable<BookType> {
    return this.http.get<BookType>(this.API_URL + '/' + id);
  }
}
