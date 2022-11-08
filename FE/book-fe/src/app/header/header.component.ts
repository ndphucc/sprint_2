import {Component, OnInit} from '@angular/core';
import {BookTypeService} from '../service/book-type.service';
import {BookType} from '../model/book-type';
import {Router} from '@angular/router';
import {Cart} from '../model/cart';
import {CartService} from '../service/cart.service';
import {Book} from '../model/book';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {AuthService} from '../service/auth.service';
import {User} from '../model/User';
import {SecurityService} from '../service/security.service';
import {FormControl, FormGroup} from '@angular/forms';
import {render, RenderParams} from 'creditcardpayments/creditCardPayments';
import {BillDetail} from '../model/bill-detail';
import {BillDetailService} from '../service/bill-detail.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bookTypes: BookType[] = [];
  cart: Cart[] = [];
  totalMoney = 0;
  username = '';
  role: string;
  user: User;
  formSearch = new FormGroup({
    search: new FormControl()
  });
  form: FormGroup = new FormGroup({
    phone: new FormControl(),
    address: new FormControl(),
    note: new FormControl()
  });
  paypal: RenderParams = {};

  constructor(private bookTypeService: BookTypeService,
              private router: Router, private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService, private authService: AuthService,
              private securityService: SecurityService,
              private billDetailService: BillDetailService,
              private toastService: ToastrService) {
    this.loadHeader();
    this.securityService.findByUser(this.username).subscribe(value => {
      this.user = value;
      this.securityService.changeUser(this.user);
    });
  }

  ngOnInit(): void {
    this.cartService.currentMessage.subscribe(message => this.totalMoney = message);
    this.securityService.currentUser.subscribe(message => this.user = message);
    this.bookTypeService.getAll().subscribe(value => {
      this.bookTypes = value;
    });
    this.showCard();
  }

  changeComponent(link: string) {
    this.loadHeader();
    console.log(link);
    this.router.navigateByUrl(link);
  }

  showCard() {
    if (JSON.parse(localStorage.getItem('cart')) == null) {
      this.cart = [];
    } else {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    this.resultTotal();
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
    this.cartService.changeMessage(this.totalMoney);
  }

  deleteCart(id: number) {
    for (const card of this.cart) {
      if (card.book.id === id) {
        this.cart.splice(this.cart.indexOf(card), 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.showCard();
        return;
      }
    }
  }

  incCart(item: Book) {
    this.cartService.addCard(item, 1);
    this.showCard();
  }

  decCart(book: Book) {
    this.cartService.addCard(book, -1);
    this.showCard();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      console.log(this.role);
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.user = undefined;
    this.securityService.changeUser(undefined);
    this.role = null;
    this.loadHeader();
    this.router.navigateByUrl('');
  }

  search() {
    if (this.formSearch.get('search').value == null || this.formSearch.get('search').value === '') {
      this.router.navigateByUrl('/book/list/0');
    } else {
      this.router.navigateByUrl('/book/list/0/' + this.formSearch.get('search').value);
    }
  }

  saveCart() {
    if (this.tokenStorageService.getUser() !== null) {
      this.cartService.saveCart().subscribe();
    }
  }

  renderPaypal() {
    if (this.tokenStorageService.getUser() == null) {
      this.router.navigateByUrl('login');
      this.toastService.warning('Vui lòng đăng nhập hoặc đăng ký trước khi thanh toán');
      return;
    }
    this.saveCart();
    this.paypal = {
      id: '#myPaypalButtons',
      currency: 'USD',
      value: ((this.totalMoney / 23000).toFixed(2)) + '',
      onApprove: (detail) => {
        const billDetail: BillDetail = this.form.value;
        billDetail.username = this.user.username;
        console.log(billDetail);
        this.billDetailService.save(billDetail).subscribe(value => {
            this.form = new FormGroup({
              phone: new FormControl(),
              address: new FormControl(),
              note: new FormControl()
            });
            Swal.fire('Thông Báo !!', 'Thanh toán thành công', 'success').then();
            localStorage.setItem('cart', JSON.stringify(null));
            document.getElementById('closePaypal').click();
          }
        );
      }
    };
    document.getElementById('myPaypalButtons').innerHTML = '';
    render(this.paypal);
    document.getElementById('showPayPal').click();
  }
}

