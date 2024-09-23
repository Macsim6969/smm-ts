import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectPages } from '../../../../../shared/namespaces/Project';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {

  public TitlePage: string = '';
  private _projectPageSettings: ProjectPages.ProjectPageSettings;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute
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
  }

}
