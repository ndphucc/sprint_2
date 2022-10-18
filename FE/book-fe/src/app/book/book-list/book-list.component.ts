import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {BookTypeService} from '../../service/book-type.service';
import {BookType} from '../../model/book-type';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../model/cart';
import {TokenStorageService} from '../../service/token-storage.service';
import {User} from '../../model/User';
import {FormControl, FormGroup} from '@angular/forms';
import {render, RenderParams} from 'creditcardpayments/creditCardPayments';
import {BillDetail} from '../../model/bill-detail';
import {BillDetailService} from '../../service/bill-detail.service';
import {SecurityService} from '../../service/security.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  bookType: BookType = {};
  cart: Cart[] = [];
  totalMoney = 0;
  previous = false;
  next = false;
  page = 0;
  user: User = {};
  form: FormGroup = new FormGroup({
    phone: new FormControl(),
    address: new FormControl(),
    note: new FormControl()
  });
  paypal: RenderParams = {};
  total = 0;

  constructor(private activeRouter: ActivatedRoute, private bookService: BookService,
              private bookTypeService: BookTypeService, private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private billDetailService: BillDetailService,
              private securityService: SecurityService,
              private router: Router,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.cartService.currentMessage.subscribe(message => this.totalMoney = message);
    this.securityService.currentUser.subscribe(message => this.user = message);
    this.page = 0;
    this.getList();
  }

  addCard(item: Book) {
    this.cartService.addCard(item, 1);
    this.showCard();
  }
  showCard() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
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

  incCart(item: Book) {
    console.log(1);
    this.cartService.addCard(item, 1);
    this.showCard();
  }

  decCart(book: Book) {
    this.cartService.addCard(book, -1);
    this.showCard();
  }

  getList() {
    this.activeRouter.paramMap.subscribe(paramMap => {
      if (paramMap.get('top') === 'top') {
        this.bookService.findTop().subscribe(value => {
          this.books = value;
          this.next = false;
          this.previous = false;
          this.bookType = {
            name: 'Top bán chạy'
          };
        });
        return;
      }
      this.bookService.getAll(+paramMap.get('id'), paramMap.get('search'), this.page).subscribe(value => {
        this.books = value.content;
        this.next = !value.last;
        this.previous = !value.first;
        console.log(this.books);
      });
      if (+paramMap.get('id') > 0) {
        this.bookTypeService.findById(+paramMap.get('id')).subscribe(value => {
          this.bookType = value;
        });
      } else {
        this.bookType = {
          name: 'Kết quả tìm kiếm'
        };
      }
    });
  }

  nextPage() {
    this.page++;
    this.getList();
  }

  previousPage() {
    this.page--;
    this.getList();
  }
  saveCart() {
    if (this.tokenStorageService.getUser() !==  null) {
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
    this.total = this.totalMoney;
    document.getElementById('show-modal-paypal').click();
  }

  buyBook(book: Book) {
    document.getElementById('myPaypalButtonslist').innerHTML = '';
    this.total = book.price;
    render({
      id: '#myPaypalButtonslist',
      currency: 'USD',
      value: (book.price / 23000).toFixed(2) + '',
      onApprove: (detail) => {
        const billDetail: BillDetail = this.form.value;
        billDetail.username = this.user.username;
        billDetail.bookCartDto = {
          amount: 1,
          book
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
