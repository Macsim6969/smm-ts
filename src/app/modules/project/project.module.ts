import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';
import { StartSettingsComponent } from './@shared/components/start-settings/start-settings.component';
import { SettingsListProjectsService } from './@shared/services/settingsListProjects.service';

const routes: Routes =[
  {path: '', component: ProjectComponent}
]

@NgModule({
  declarations: [
    ProjectComponent,
    SidebarComponent,
    StartSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SettingsListProjectsService
  ]
})
export class ProjectModule { }
