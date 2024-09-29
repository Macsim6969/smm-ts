import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';
import { StartSettingsComponent } from './@shared/components/start-settings/start-settings.component';
import { SettingsListProjectsService } from './@shared/services/settingsListProjects.service';
import { DashboardComponent } from './@shared/components/dashboard/dashboard.component';
import { AddedUserService } from './@shared/services/addedUser.service';
import { CreatedLinkComponent } from './@shared/components/created-link/created-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddedUserApiService } from '../../api/addedUserApi.service';

const routes: Routes = [
  {
    path: '', component: ProjectComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'music', loadChildren: () => import('../music/music.module').then(m => m.MusicModule) },
      { path: 'draft', loadChildren: () => import('../drafts/drafts.module').then(m => m.DraftsModule) },
      { path: 'direct-messages', loadChildren: () => import('../messages/messages.module').then(m => m.MessagesModule) }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectComponent,
    SidebarComponent,
    StartSettingsComponent,
    CreatedLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    SettingsListProjectsService,
    AddedUserService,
    AddedUserApiService
  ]
})
export class ProjectModule { }
