import {Component, OnInit} from '@angular/core';
import {BillHistory} from '../../model/bill-history';
import {BillDetailService} from '../../service/bill-detail.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  billHistory: BillHistory[] = [];

  constructor(private billDetailService: BillDetailService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.billDetailService.getHistory(this.tokenStorageService.getUser().username).subscribe(value => {
        this.billHistory = value;
      });
    }

  }

}
