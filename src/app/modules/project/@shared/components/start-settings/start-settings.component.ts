import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsListProjectsService } from '../../services/settingsListProjects.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { IListPages, IListSettings } from '../../model/listSettings.interface';
import { ApiService } from '../../../../../api/api.service';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectActiveProject, selectPagesList } from '../../../../../store/selectors/store.selectors';

@Component({
  selector: 'app-start-settings',
  templateUrl: './start-settings.component.html',
  styleUrl: './start-settings.component.scss'
})
export class StartSettingsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public listSettings: IListSettings[];
  private activeProject: string;
  public projectPageList: string[];
  public isChoiceNewList: boolean;

  constructor(
    private settingsListProjects: SettingsListProjectsService,
    private apiService: ApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.getActivePageFromStore();
    this.initializeListSettingsFromService();
  }

  private initializeListSettingsFromService() {
    this.listSettings = this.settingsListProjects._listSettings;
  }

  private getActivePageFromStore() {
    combineLatest([this.store.pipe(select(selectPagesList)), this.store.pipe(select(selectActiveProject))]).pipe(takeUntil(this.destroy$))
      .subscribe(([pageList, activeProject]) => {
        this.activeProject = activeProject;
        this.projectPageList = pageList ? pageList : this.projectPageList;
      })
  }

  public hasActiveContent(contentKey: string): boolean {
    if (Array.isArray(this.projectPageList)) {
      return this.projectPageList.includes(contentKey);
    } else {
      return false;
    }
  }

  public choicePage(key: string): void {
    const projectPageListCopy = [...this.projectPageList];

    if (this.projectPageList?.includes(key)) {
      this.projectPageList = this.projectPageList.filter((data) => data !== key);
    } else {
      this.projectPageList = [...this.projectPageList, key];
    }

    this.isChoiceNewList = this.projectPageList.length !== projectPageListCopy.length;
  }


  public Save() {
    if (this.activeProject && this.projectPageList.length > 0) {
      const newData: IListPages = { keyProject: this.activeProject, key: this.projectPageList };
      this.apiService.setSidebarList(newData, this.activeProject);
      this.Close();
    }
  }

  public Close() {
    this.settingsListProjects._isOpenSettings = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
