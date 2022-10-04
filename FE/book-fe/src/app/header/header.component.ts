import {Component, OnInit} from '@angular/core';
import {BookTypeService} from '../service/book-type.service';
import {BookType} from '../model/book-type';
import {Router} from '@angular/router';
import {Cart} from '../model/cart';
import {CartService} from '../service/cart.service';
import {Book} from '../model/book';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bookTypes: BookType[] = [];
  cart: Cart[] = [];
  totalMoney = 0;

  constructor(private bookTypeService: BookTypeService,
              private router: Router, private cartService: CartService) {
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
}
