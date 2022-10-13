import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BillDetail} from '../model/bill-detail';
import {Observable} from 'rxjs';
import {BillHistory} from '../model/bill-history';

@Injectable({
  providedIn: 'root'
})
export class BillDetailService {
  API_URL = 'http://localhost:8080/api/billDetail';

  constructor(private http: HttpClient) {
  }

  save(billDetail: BillDetail): Observable<BillDetail> {
    return this.http.post(this.API_URL + '/save', billDetail);
  }

  getHistory(user: string): Observable<BillHistory[]> {
    return this.http.get<BillHistory[]>(this.API_URL + '/history/' + user);
  }
}
