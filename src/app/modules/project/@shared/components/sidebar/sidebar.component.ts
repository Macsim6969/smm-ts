import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectPages } from '../../../../../shared/namespaces/Project';
import { SettingsListProjectsService } from '../../services/settingsListProjects.service';
import { IListSettings } from '../../model/listSettings.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {

  public TitlePage: string = '';
  private _projectPageSettings: ProjectPages.ProjectPageSettings;

  public listSettings: IListSettings[] = [];
  public isActive: string[] = [];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private settingsListProjects: SettingsListProjectsService
  ) {
    this._projectPageSettings = new ProjectPages.ProjectPageSettings(this.store);
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((data) => {
      if (data) {
        this._projectPageSettings.getNameActivePage(data['id'], (name: string) => {
          this.TitlePage = name;
        });
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
