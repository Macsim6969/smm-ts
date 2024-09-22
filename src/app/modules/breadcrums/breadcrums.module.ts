import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumsService } from '../../shared/services/breadcrums.service';


@NgModule({
  declarations: [
    BreadcrumsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumsComponent
  ],
  providers: [BreadcrumsService]
})
export class BreadcrumsModule { }
