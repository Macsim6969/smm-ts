import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumsModule } from '../breadcrums/breadcrums.module';
import { ShareModule } from "../../shared/module/share.module";
import { AddedFilesPopupComponent } from '../../shared/components/added-files-popup/added-files-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    AddedFilesPopupComponent
  ],
  imports: [
    CommonModule,
    BreadcrumsModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class HomeModule { }
