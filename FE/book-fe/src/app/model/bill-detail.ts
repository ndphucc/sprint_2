import {Cart} from './cart';

export interface BillDetail {
  username?: string;
  phone?: string;
  note?: string;
  address?: string;
  bookCartDto?: Cart;
}
