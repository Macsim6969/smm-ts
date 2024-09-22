import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumsModule } from '../breadcrums/breadcrums.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BreadcrumsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
