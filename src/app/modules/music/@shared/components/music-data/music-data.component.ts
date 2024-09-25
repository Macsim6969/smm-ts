import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-music-data',
  templateUrl: './music-data.component.html',
  styleUrl: './music-data.component.scss'
})
export class MusicDataComponent {
  userProfile: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    try {
      this.spotifyService.getUserProfile().subscribe(data => {
        this.userProfile = data;
      });
    } catch (e) {
      console.log('Токен отсутствует, пользователь не авторизован.');
    }
  }

  authorize(): void {
    this.spotifyService.authorize();
  }
}
