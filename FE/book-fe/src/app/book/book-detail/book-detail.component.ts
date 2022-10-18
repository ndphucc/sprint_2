import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../service/book.service';
import {CartService} from '../../service/cart.service';
import {Book} from '../../model/book';
import {Cart} from '../../model/cart';
import {TokenStorageService} from '../../service/token-storage.service';
import {User} from '../../model/User';
import {FormControl, FormGroup} from '@angular/forms';
import {render, RenderParams} from 'creditcardpayments/creditCardPayments';
import {BillDetail} from '../../model/bill-detail';
import {BillDetailService} from '../../service/bill-detail.service';
import {SecurityService} from '../../service/security.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book = {};
  amount = 1;
  cart: Cart[] = [];
  totalMoney = 0;
  user: User;
  form: FormGroup = new FormGroup({
    phone: new FormControl(),
    address: new FormControl(),
    note: new FormControl()
  });
  paypal: RenderParams = {};
  total = 0;

  constructor(private activateRouter: ActivatedRoute, private bookService: BookService, private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private billDetailService: BillDetailService,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.cartService.currentMessage.subscribe(message => this.totalMoney = message);
    this.securityService.currentUser.subscribe(message => this.user = message);
    this.activateRouter.paramMap.subscribe(param => {
      this.bookService.findById(+param.get('id')).subscribe(value => {
        this.book = value;
      });
    });
  }

  incAmount() {
    this.amount++;
  }

  desAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  resultTotal() {
    let temp = 0;
    if (this.cart === null || this.cart.length === 0) {
      temp = 0;
    } else {
      for (const item of this.cart) {
        temp += item.book.price * item.amount;
      }
    }
    this.totalMoney = temp;
  }

  deleteCart(id: number) {
    for (const card of this.cart) {
      if (card.book.id === id) {
        this.cart.splice(this.cart.indexOf(card), 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return;
      }
    }
  }

  showCard() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.resultTotal();
  }

  incCart(item: Book) {
    this.cartService.addCard(item, 1);
    this.showCard();
  }

  decCart(book: Book) {
    this.cartService.addCard(book, -1);
    this.showCard();
  }

  addCart() {
    this.cartService.addCard(this.book, this.amount);
    this.showCard();
  }

  saveCart() {
    if (this.tokenStorageService.getUser() !== null) {
      this.cartService.saveCart().subscribe();
    }
  }

  renderPaypal() {
    this.saveCart();
    this.paypal = {
      id: '#myPaypalButtonslist',
      currency: 'USD',
      value: ((this.totalMoney / 23000).toFixed(2)) + '',
      onApprove: (detail) => {
        const billDetail: BillDetail = this.form.value;
        billDetail.username = this.user.username;
        console.log(billDetail);
        this.billDetailService.save(billDetail).subscribe(value => {
            localStorage.setItem('cart', JSON.stringify(null));
            document.getElementById('closePaypal-list').click();
          }
        );
      }
    };
    document.getElementById('myPaypalButtonslist').innerHTML = '';
    render(this.paypal);
  }

  buyBook() {
    debugger;
    document.getElementById('myPaypalButtonslist').innerHTML = '';
    this.total = this.book.price;
    render({
      id: '#myPaypalButtonslist',
      currency: 'USD',
      value: (this.book.price * this.amount / 23000).toFixed(2) + '',
      onApprove: (detail) => {
        const billDetail: BillDetail = this.form.value;
        billDetail.username = this.user.username;
        billDetail.bookCartDto = {
          amount: this.amount,
          book: this.book
        };
        this.billDetailService.save(billDetail).subscribe(value => {
            document.getElementById('closePaypal-list').click();
          }
        );
      }
    });
    document.getElementById('show-modal-paypal').click();
  }
}
