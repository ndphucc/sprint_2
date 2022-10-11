import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaypalRoutingModule } from './paypal-routing.module';
import { PaypalComponent } from './paypal/paypal.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PaypalComponent],
  exports: [
    PaypalComponent
  ],
  imports: [
    CommonModule,
    PaypalRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaypalModule { }
