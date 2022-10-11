import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {CartService} from '../../service/cart.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../service/token-storage.service';
import {SecurityService} from '../../service/security.service';
import {User} from '../../model/User';

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
              private securityService: SecurityService) {
    render(
      {
        id: '#myPaypalButtons',
        currency: 'USD',
        value: this.cartService.resultTotal() + '',
        onApprove: (detail) => {
          alert('transaction succesfull');
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.securityService.findByUser(this.tokenService.getUser().username).subscribe(user => {
        this.user = user;
      })
      ;
    }
    this.total = this.cartService.resultTotal();
    this.form = this.fb.group({
      phone: [''],
      address: [''],
      note: ['']
    });
  }

  save() {

  }
}
