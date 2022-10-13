import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import {InfoComponent} from './info/info.component';
import {AuthGuard} from '../security/auth.guard.';


const routes: Routes = [
  {
    path: 'history',
    component: TransactionHistoryComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
