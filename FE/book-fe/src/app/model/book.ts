import {BookType} from './book-type';

export interface Book {
  id?: number;
  name?: string;
  code?: string;
  author?: string;
  publishingCompany?: string;
  totalPage?: number;
  size?: string;
  amount?: number;
  price?: number;
  releaseDate?: string;
  img?: string;
  typeBook?: BookType;
  amountBuy?: number;
}
