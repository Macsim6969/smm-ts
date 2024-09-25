import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyService } from './@shared/services/spotify.service';
import { MusicDataComponent } from './@shared/components/music-data/music-data.component';

const routes: Routes = [
  { path: '', component: MusicComponent , children: [
    {path: 'data', component: MusicDataComponent}
  ]}
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
