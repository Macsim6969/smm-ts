import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { PageManagementService } from './@shared/services/pageManagment.service';

const routes: Routes =[
  {path: '', component: ProjectComponent, children: [
    {path: 'id'}
  ]}
]

@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PageManagementService
  ]
})
export class ProjectModule { }
