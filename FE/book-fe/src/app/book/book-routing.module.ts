import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailComponent} from './book-detail/book-detail.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
