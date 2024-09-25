import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from './@shared/services/spotify.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {


  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Получаем код из URL после редиректа
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        // Если код есть, пытаемся получить токен
        this.spotifyService.getAccessToken(code).subscribe(response => {
          const token = response.access_token;
          this.spotifyService.setAccessToken(token);
          this.router.navigate(['/']);
        }, error => {
          console.error('Ошибка получения токена:', error);
        });
      } else {
        console.log('Код отсутствует в параметрах URL');
      }
    });
  }
}
