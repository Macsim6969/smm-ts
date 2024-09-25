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
  public projectPageList: string[] = [];

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
        this.projectPageList = pageList;
      })
  }

  public hasActiveContent(contentKey: string): boolean {
    if (Array.isArray(this.projectPageList)) {
      return this.projectPageList.includes(contentKey);
    } else {
      return false;
    }
  }

  public choicePage(key: string) {
    const projectPageListCopy = [...this.projectPageList];

    if (projectPageListCopy.includes(key)) {
      this.projectPageList = projectPageListCopy.filter((data) => data !== key);
    } else {
      projectPageListCopy.push(key);
      this.projectPageList = projectPageListCopy;
    }

    this.settingsListProjects._choiceActivePage = this.projectPageList;
  }

  public Save() {
    if (this.activeProject && this.projectPageList.length > 0) {
      const newData: IListPages = { keyProject: this.activeProject, key: this.projectPageList };
      this.apiService.setSidebarList(newData, this.activeProject);
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
