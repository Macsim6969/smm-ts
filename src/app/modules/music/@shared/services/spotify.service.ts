import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class SpotifyService {
  private clientId = '846b3dfb9a074e96a0a15432baaa9e44';  // Твой Client ID
  private redirectUri = 'http://localhost:4200/bbc/music/data';  // Твой redirect URI
  private baseUrl = 'https://api.spotify.com/v1/';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=user-read-private%20user-read-email`;

  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  // Метод для перенаправления пользователя на страницу авторизации Spotify
  authorize(): void {
    window.location.href = this.authUrl;
  }

  // Получение токена с помощью авторизационного кода
  getAccessToken(code: string): Observable<any> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      client_secret: 'your_client_secret'
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.tokenUrl, body.toString(), { headers }).pipe(
      catchError(error => {
        console.error('Ошибка при обмене кода на токен:', error);
        return throwError(error);
      })
    );
  }

  // Установка токена
  setAccessToken(token: string): void {
    this.accessToken = token;
    console.log('Токен установлен:', this.accessToken);
  }

  // Пример запроса на получение профиля пользователя
  getUserProfile(): Observable<any> {
    if (!this.accessToken) {
      throw new Error('Access token is not set');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
  
    return this.http.get(`${this.baseUrl}me`, { headers });
  }
}
