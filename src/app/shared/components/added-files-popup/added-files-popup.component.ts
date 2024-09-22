import { Component } from '@angular/core';
import { IsFilePopupSettingsService } from '../../services/isFilesPopupSettings.service';

@Component({
  selector: 'app-added-files-popup',
  templateUrl: './added-files-popup.component.html',
  styleUrl: './added-files-popup.component.scss'
})
export class AddedFilesPopupComponent {

  constructor(
    private IsFilePopupSettings: IsFilePopupSettingsService
  ) { }

  public closePopup() {
    this.IsFilePopupSettings._isOpenPopup = false;
  }

}
