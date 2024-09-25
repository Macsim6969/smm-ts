import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectPages } from '../../../../../shared/namespaces/Project';
import { SettingsListProjectsService } from '../../services/settingsListProjects.service';
import { IListSettings } from '../../model/listSettings.interface';
import { SetActiveProject, startGetData } from '../../../../../store/actions/store.actions';
import { of, take } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

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
    this.route.params.subscribe((data) => {
      if (data['id']) {
        this.TitlePage = data["id"];
        this.store.dispatch(SetActiveProject({ value: data['id'] }));
        this.store.dispatch(startGetData());
      }
    })

    ////
    this.initializeListSettingsFromService();
    this.streamToActivePage();
  }

  private initializeListSettingsFromService() {
    this.listSettings = this.settingsListProjects._listSettings;
  }

  private streamToActivePage() {
    this.settingsListProjects._choiceActivePage$.subscribe((data) => {
      this.isActive = data;
    })
  }

  public hasActiveContent(listContent: any[]): boolean {
    return listContent.some(content => this.isActive.includes(content.key));
  }

}
