import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AddedFilesPopupComponent } from '../../shared/components/added-files-popup/added-files-popup.component';
import { IsFilePopupSettingsService } from '../../shared/services/isFilesPopupSettings.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AddedFilesPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    IsFilePopupSettingsService
  ]
})
export class HomeModule { }
