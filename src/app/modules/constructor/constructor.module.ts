import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';

const routes: Routes = [
  { path: '', component: ConstructorComponent }
]

@NgModule({
  declarations: [
    ConstructorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxGraphModule
  ]
})
export class ConstructorModule { }
