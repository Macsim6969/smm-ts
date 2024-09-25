import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectPages } from '../../../../../shared/namespaces/Project';
import { SettingsListProjectsService } from '../../services/settingsListProjects.service';
import { IListSettings } from '../../model/listSettings.interface';
import { SetActiveProject, startGetData } from '../../../../../store/actions/store.actions';
import { of, Subject, take, takeUntil } from 'rxjs';
import { selectPagesList } from '../../../../../store/selectors/store.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public TitlePage: string = '';
  public listSettings: IListSettings[] = [];
  public isActive: string[] = [];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private settingsListProjects: SettingsListProjectsService
  ) {

  }

  ngOnInit(): void {
    this.streamToActiveProject();
    this.initializeListSettingsFromService();
    this.streamToActivePage();
  }

  private streamToActiveProject() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data['id']) {
        this.TitlePage = data["id"];
        this.store.dispatch(SetActiveProject({ value: data['id'] }));
      }
    })
  }

  private initializeListSettingsFromService() {
    this.listSettings = this.settingsListProjects._listSettings;
  }

  private streamToActivePage() {
    this.store.pipe(select(selectPagesList)).pipe(takeUntil(this.destroy$)).subscribe((data: string[]) => {
      this.isActive = data;
    })
  }

  public hasActiveContent(listContent: any[]): boolean {
    return listContent.some(content => this.isActive.includes(content.key));
  }

  public openSettings() {
    this.settingsListProjects._isOpenSettings = true;
  }

}
