import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookCreateComponent} from './book-create/book-create.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'book/list/:id/:search',
    component: BookListComponent
  },
  {
    path: 'book/list/:id',
    component: BookListComponent
  },
  {
    path: 'book/detail/:id',
    component: BookDetailComponent
  },
  {
    path: 'book/:top',
    component: BookListComponent
  },
  {
    path: 'books/create',
    component: BookCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'book/edit/:id',
    component: BookEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
