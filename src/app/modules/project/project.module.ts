import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';
import { StartSettingsComponent } from './@shared/components/start-settings/start-settings.component';
import { SettingsListProjectsService } from './@shared/services/settingsListProjects.service';

const routes: Routes = [
  {
    path: '', component: ProjectComponent, children: [
      { path: 'music', loadChildren: () => import('../music/music.module').then(m => m.MusicModule) },
      { path: 'draft', loadChildren: () => import('../drafts/drafts.module').then(m => m.DraftsModule) },
      { path: 'direct-messages', loadChildren: () => import('../messages/messages.module').then(m => m.MessagesModule) }
    ]
  }
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
