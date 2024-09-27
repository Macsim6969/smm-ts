import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './@shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesApiService } from '../../api/messagesApi.service';
import { ChatsComponent } from './@shared/components/chats/chats.component';


const routes: Routes = [
  { path: '', component: MessagesComponent, children: [
    {path: ':id', component: ChatsComponent}
  ]}
]

@NgModule({
  declarations: [
    MessagesComponent,
    HeaderComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessagesApiService
  ]
})
export class MessagesModule { }
