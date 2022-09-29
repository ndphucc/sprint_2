import {Component, OnInit} from '@angular/core';
import {BookTypeService} from '../service/book-type.service';
import {BookType} from '../model/book-type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bookTypes: BookType[] = [];

  constructor(private bookTypeService: BookTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.bookTypeService.getAll().subscribe(value => {
      console.log(value);
      this.bookTypes = value;
    });
  }

  getBookType(id: number) {
    this.router.navigate([`book/list/${id}/#`]);
  }
}
