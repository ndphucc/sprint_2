import {Cart} from './cart';

export interface BillHistory {
  name?: string;
  phone?: string;
  billDate?: string;
  address?: string;
  total?: number;
  bookBillList?: Cart[];
}
