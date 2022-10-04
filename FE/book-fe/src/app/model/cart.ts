import {Book} from './book';

export interface Cart {
  book?: Book;
  amount?: number;
}
