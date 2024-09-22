import { Component } from '@angular/core';
import { IsFilePopupSettingsService } from '../../services/isFilesPopupSettings.service';
import { PageManagementService } from '../../services/pageManagment.service';

@Component({
  selector: 'app-added-files-popup',
  templateUrl: './added-files-popup.component.html',
  styleUrl: './added-files-popup.component.scss'
})
export class AddedFilesPopupComponent {
  public key: string;
  public isOpenData: boolean;
  public nameFile: string;
  constructor(
    private IsFilePopupSettings: IsFilePopupSettingsService,
    private pageManagment: PageManagementService
  ) { }

  public choiceTypePR(key: string) {
    this.isOpenData = true;
    this.key = key;
  }

  public createProject() {
    this.pageManagment._pages = { id: this.pageManagment._pages.length + 1, key: this.key, name: this.nameFile, route: `/${this.nameFile}` };
    this.isOpenData = false;
    this.closePopup();
  }

  public closePopup() {
    this.IsFilePopupSettings._isOpenPopup = false;
  }

}
