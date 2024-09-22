import { Component } from '@angular/core';
import { PageManagementService } from '../../services/pageManagment.service';
import { ApiService } from '../../../api/api.service';
import { IPages } from '../../model/pages.interface';

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
    private pageManagment: PageManagementService,
    private apiService: ApiService
  ) { }

  public choiceTypePR(key: string) {
    this.isOpenData = true;
    this.key = key;
  }

  public createProject() {
    const newPage: IPages = { id: this.pageManagment._pages.length + 1, key: this.key, name: this.nameFile, route: `/${this.nameFile}` };
    this.pageManagment._pages = newPage ;
    this.apiService.setNewProject(newPage, this.nameFile);
    this.isOpenData = false;
  }

}
