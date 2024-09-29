import { Component } from '@angular/core';
import { AddedUserService } from '../../services/addedUser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private addedUser: AddedUserService
  ) { }

  public addUser() {
    this.addedUser._isOpenPopup = true;
  }
}
