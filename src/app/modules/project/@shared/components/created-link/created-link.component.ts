import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddedUserService } from '../../services/addedUser.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AddedUserApiService } from '../../../../../api/addedUserApi.service';
import { IUser } from '../../model/users.interface';

@Component({
  selector: 'app-created-link',
  templateUrl: './created-link.component.html',
  styleUrl: './created-link.component.scss'
})
export class CreatedLinkComponent {

  userName: string = '';
  generatedUrl: string = '';

  constructor(
    private addedUser: AddedUserService,
    private addedUserApi: AddedUserApiService
  ) { }

  public generateToken(): void {
    if (this.userName) {
      const token = this.generateRandomToken(40); // Генерация случайного ключа длиной 16 символов
      const currentUrl = window.location.href.split('?')[0]; // Текущий URL без параметров
      this.generatedUrl = `${currentUrl}?key=${token}`; // URL с ключом

      const newUser: IUser = {
        activeTOken: null,
        key: token,
        name: this.userName
      }
      this.addedUserApi.setChangesMessagesData(newUser);
    }
  }

  private generateRandomToken(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public close() {
    this.addedUser._isOpenPopup = false;
  }

}
