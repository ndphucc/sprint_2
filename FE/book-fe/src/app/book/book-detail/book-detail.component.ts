import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../service/book.service';
import {CartService} from '../../service/cart.service';
import {Book} from '../../model/book';
import {Cart} from '../../model/cart';
import {TokenStorageService} from '../../service/token-storage.service';

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

  constructor(private activateRouter: ActivatedRoute, private bookService: BookService, private cartService: CartService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
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
    if (this.tokenStorageService.getUser() !==  null) {
      this.cartService.saveCart().subscribe();
    }
  }
}
