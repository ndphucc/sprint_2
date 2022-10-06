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
  user: User = {};
  formSearch = new FormGroup({
    search: new FormControl()
  });

  constructor(private bookTypeService: BookTypeService,
              private router: Router, private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService, private authService: AuthService,
              private securityService: SecurityService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
      console.log(this.username);
      this.securityService.findByUser(this.username).subscribe(value => {
        this.user = value;
      });
    });
  }

  ngOnInit(): void {
    this.bookTypeService.getAll().subscribe(value => {
      this.bookTypes = value;
    });
    this.showCard();
  }

  changeComponent(link: string) {
    this.router.navigateByUrl(link);
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
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  logout() {
    this.authService.logout();
    this.user = {};
  }

  search() {
    if (this.formSearch.get('search').value == null || this.formSearch.get('search').value === '' + '') {
      this.router.navigateByUrl('/book/list/0');
    } else {
      this.router.navigateByUrl('/book/list/0/' + this.formSearch.get('search').value);
    }
  }
}
