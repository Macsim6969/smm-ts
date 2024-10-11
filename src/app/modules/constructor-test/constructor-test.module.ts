import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorTestComponent } from './constructor-test.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConstructorTestComponent }
]

@NgModule({
  declarations: [
    ConstructorTestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ConstructorTestModule { }
