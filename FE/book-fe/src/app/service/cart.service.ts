import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Book} from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[] = [];

  constructor() {
  }

  addCard(book: Book, amount: number) {
    let temp: Cart = {};
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].book.id === book.id) {
        temp = {
          book,
          amount: amount + this.cart[i].amount
        };
        this.cart[i] = temp;
        if (temp.amount === 0) {
          this.cart.splice(i, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return;
      }
    }
    temp = {
      book,
      amount
    };
    this.cart.push(temp);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
