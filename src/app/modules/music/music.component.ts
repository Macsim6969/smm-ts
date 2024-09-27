import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from './@shared/services/spotify.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {
  accessToken: string | null = null;
  searchTerm: string = '';
  tracks: any[] = [];
  artists: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accessToken = this.spotifyService.getAccessTokenFromStorage();

    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.spotifyService.getAccessToken(code).subscribe(response => {
          const token = response.access_token;
          this.spotifyService.setAccessToken(token);
          this.accessToken = token;
          this.loadTracks();
        }, error => {
          console.error('Ошибка получения токена:', error);
        });
      } else {
        this.loadTracks();
      }
    });

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      this.initializePlayer();
    };
  }

  initializePlayer() {
    const player = new (window as any).Spotify.Player({
      name: 'Web Player',
      getOAuthToken: cb => { cb(this.accessToken); },
      volume: 1
    });

    player.connect();
  }

  startAuthorization() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.spotifyService.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.spotifyService.redirectUri)}&scope=user-read-private user-read-email user-top-read streaming user-read-playback-state`;
    window.location.href = authUrl;
  }

  search(): void {
    if (this.searchTerm) {
      this.spotifyService.searchTracks(this.searchTerm).subscribe(response => {
        this.tracks = response.tracks.items;
      }, error => {
        console.error('Ошибка поиска треков:', error);
      });

      this.spotifyService.searchArtists(this.searchTerm).subscribe(response => {
        this.artists = response.artists.items;
      }, error => {
        console.error('Ошибка поиска исполнителей:', error);
      });
    }
  }

  loadTracks() {
    if (this.accessToken) {
      this.spotifyService.getTracks().subscribe(response => {
        this.tracks = response.items;
      }, error => {
        console.error('Ошибка получения треков:', error);
      });
    }
  }

  playTrack(trackId: string) {
    const player = new (window as any).Spotify.Player({
      name: 'Web Player',
      getOAuthToken: cb => { cb(this.accessToken); },
      volume: 1
    });

    player.connect();

    player.addListener('ready', ({ device_id }) => {
      this.spotifyService.playTrack(device_id, trackId).subscribe();
    });
  }

  pauseTrack() {
    const player = new (window as any).Spotify.Player({
      name: 'Web Player',
      getOAuthToken: cb => { cb(this.accessToken); },
      volume: 0.5
    });

    player.togglePlay().catch(error => {
      console.error('Ошибка при приостановке трека:', error);
    });
  }
}
