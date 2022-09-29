import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {BookTypeService} from '../../service/book-type.service';
import {BookType} from '../../model/book-type';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  bookType: BookType = {};

  constructor(private activeRouter: ActivatedRoute, private bookService: BookService, private bookTypeService: BookTypeService) {
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

}
