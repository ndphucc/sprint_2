import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Book} from '../model/book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartUser} from '../model/CartUser';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  API_URL = 'http://localhost:8080/api/cart';
  cart: Cart[] = [];

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
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

  getCart(username: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.API_URL + '/' + username);
  }

  saveCart(): Observable<any> {
    const temp: CartUser = {
      username: this.tokenStorageService.getUser().username,
      bookCart: JSON.parse(localStorage.getItem('cart'))
    };
    return this.http.post(this.API_URL + '/save', temp);
  }

  resultTotal(): number {
    let temp = 0;
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (this.cart === null || this.cart.length === 0) {
      temp = 0;
    } else {
      for (const item of this.cart) {
        temp += item.book.price * item.amount;
      }
    }
    return temp;
  }
}
