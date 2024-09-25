// spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpotifyService {
  public clientId = '846b3dfb9a074e96a0a15432baaa9e44';
  private clientSecret = '9f82503618ec45fbaa0be37836b73ef3'; // Замените на ваш client secret
  public redirectUri = 'http://localhost:4200/bbc/music'; // Убедитесь, что этот URI совпадает с зарегистрированным
  private accessToken: string | null = null; // Храним токен доступа

  constructor(private http: HttpClient) {}

  // Метод для установки токена доступа
  setAccessToken(token: string) {
    this.accessToken = token; // Сохраняем токен
    localStorage.setItem('spotifyAccessToken', token); // Опционально: сохраняем токен в локальном хранилище
  }

  // Метод для получения токена доступа
  getAccessToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', this.redirectUri); // Этот URI должен совпадать с зарегистрированным
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    console.log('Запрос токена с параметрами:', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      client_secret: this.clientSecret
    });

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    });
  }

  // Метод для получения сохраненного токена (если нужно)
  getAccessTokenFromStorage(): string | null {
    return localStorage.getItem('spotifyAccessToken');
  }

  // Метод для получения треков
  getTracks(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    // Запрос к API для получения топ треков текущего пользователя
    return this.http.get('https://api.spotify.com/v1/me/top/tracks', { headers });
  }

  // Метод для воспроизведения трека
  playTrack(deviceId: string, trackId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    const body = {
      uris: [`spotify:track:${trackId}`]
    };

    return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, body, { headers });
  }
}
