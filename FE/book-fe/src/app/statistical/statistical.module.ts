import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalComponent } from './statistical/statistical.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [StatisticalComponent],
    imports: [
        CommonModule,
        StatisticalRoutingModule,
        ReactiveFormsModule
    ]
})
export class StatisticalModule { }
