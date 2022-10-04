import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {BookTypeService} from '../../service/book-type.service';
import {BookType} from '../../model/book-type';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../model/cart';

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

  constructor(private activeRouter: ActivatedRoute, private bookService: BookService,
              private bookTypeService: BookTypeService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(paramMap => {
      this.bookService.getAll(+paramMap.get('id'), paramMap.get('search')).subscribe(value => {
        this.books = value.content;
      });
      this.bookTypeService.findById(+paramMap.get('id')).subscribe(value => {
        this.bookType = value;
      });
    });
  }

  addCard(item: Book) {
    this.cartService.addCard(item, 1);
    this.cart = JSON.parse(localStorage.getItem('cart'));
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
