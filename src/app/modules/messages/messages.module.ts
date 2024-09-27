import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './@shared/components/header/header.component';

const routes: Routes = [
  { path: '', component: MessagesComponent }
]

@NgModule({
  declarations: [
    MessagesComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MessagesModule { }
