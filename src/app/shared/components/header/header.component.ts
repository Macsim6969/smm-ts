import { Component } from '@angular/core';
import { IsFilePopupSettingsService } from '../../services/isFilesPopupSettings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private IsFilePopupSettings: IsFilePopupSettingsService
  ) { }

  public openPopup() {
    this.IsFilePopupSettings._isOpenPopup = true;
  }
}
