import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyService } from './@shared/services/spotify.service';

const routes: Routes = [
  { path: '', component: MusicComponent}
]

@NgModule({
  declarations: [
    MusicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    SpotifyService
  ]
})
export class MusicModule { }
