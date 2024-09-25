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
  tracks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

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
        console.log('Код отсутствует в параметрах URL');
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
      volume: 0.2
    });

    player.connect().then(success => {
      if (success) {
        console.log('Успешно подключено к Spotify Player');
      }
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Player is ready with device ID:', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Player is not ready:', device_id);
    });
  }

  startAuthorization() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.spotifyService.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.spotifyService.redirectUri)}&scope=user-read-private user-read-email user-top-read streaming user-read-playback-state`;
    window.location.href = authUrl;
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
      volume: 0.5
    });

    player.connect().then(success => {
      if (success) {
        console.log('Успешно подключено к Spotify Player');
      }
    });

    player.addListener('ready', ({ device_id }) => {
      this.spotifyService.playTrack(device_id, trackId).subscribe(() => {
        console.log(`Playing track: ${trackId}`);
      });
    });
  }
}
