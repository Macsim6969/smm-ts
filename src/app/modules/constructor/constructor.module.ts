import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConstructorComponent } from './constructor.component';

const routes: Routes = [
  { path: '', component: ConstructorComponent }
]

@NgModule({
  declarations: [
    ConstructorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ]
})
export class ConstructorModule { }
