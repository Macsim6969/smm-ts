import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DraftsApiService } from './@shared/services/draftsApi.service';

const routes: Routes = [
  { path: '', component: DraftsComponent }
]

@NgModule({
  declarations: [
    DraftsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers :[
    DraftsApiService
  ]
})
export class DraftsModule { }
