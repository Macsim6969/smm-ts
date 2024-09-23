import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { IPages } from '../../model/pages.interface';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../store/model/store.model';
import { selectUserProjects, selectUserProjectsLenght } from '../../../store/selectors/store.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-added-files-popup',
  templateUrl: './added-files-popup.component.html',
  styleUrl: './added-files-popup.component.scss'
})
export class AddedFilesPopupComponent {
  public key: string;
  public isOpenData: boolean;
  public nameFile: string;
  private projectSize: number;
  constructor(
    private apiService: ApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  public choiceTypePR(key: string) {
    this.isOpenData = true;
    this.key = key;
  }

  public createProject() {

    this.store.pipe(select(selectUserProjects), take(1)).subscribe((data) => this.projectSize = data.length);
    const newPage: IPages = { id: this.projectSize + 1, key: this.key, name: this.nameFile, route: `/${this.nameFile}` };
    this.apiService.setNewProject(newPage, this.nameFile);
    this.isOpenData = false;
  }

}
