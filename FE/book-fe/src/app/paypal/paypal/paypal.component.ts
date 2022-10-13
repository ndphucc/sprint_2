import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {CartService} from '../../service/cart.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../service/token-storage.service';
import {SecurityService} from '../../service/security.service';
import {User} from '../../model/User';
import {BillDetailService} from '../../service/bill-detail.service';
import {BillDetail} from '../../model/bill-detail';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  total = 0;
  form: FormGroup = new FormGroup({
    phone: new FormControl(),
    address: new FormControl(),
    note: new FormControl()
  });
  user: User = {};

  constructor(private cartService: CartService, private tokenService: TokenStorageService, private fb: FormBuilder,
              private securityService: SecurityService, private billDetailService: BillDetailService) {
    this.cartService.currentMessage.subscribe(message => this.total = message);
    console.log(JSON.stringify(this.total / 23000));

  }

  ngOnInit(): void {
    this.securityService.currentUser.subscribe(message => this.user = message);
    if (this.tokenService.getToken()) {
      this.securityService.findByUser(this.tokenService.getUser().username).subscribe(user => {
        this.user = user;
      })
      ;
    }
    this.form = this.fb.group({
      phone: [''],
      address: [''],
      note: ['']
    });
  }

  save() {

  }
}
