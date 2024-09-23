import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';

const routes: Routes =[
  {path: '', component: ProjectComponent}
]

@NgModule({
  declarations: [
    ProjectComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class ProjectModule { }
