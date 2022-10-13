import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent
  ],
  exports: [
    BookDetailComponent
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        ReactiveFormsModule
    ]
})
export class BookModule { }
