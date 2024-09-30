import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests.component';
import { RouterModule, Routes } from '@angular/router';
import { TestService } from './@shared/services/test.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchCategoriesPipe } from './@shared/pipe/search.pipe';

const routes: Routes = [
  { path: '', component: TestsComponent }
]

@NgModule({
  declarations: [
    TestsComponent,
    SearchCategoriesPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    TestService
  ]
})
export class TestsModule { }
