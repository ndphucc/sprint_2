import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BookCreateComponent } from './book-create/book-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BookEditComponent } from './book-edit/book-edit.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent
  ],
  exports: [
    BookDetailComponent,
    BookCreateComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class BookModule { }
