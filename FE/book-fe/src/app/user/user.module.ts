import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [TransactionHistoryComponent, InfoComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
