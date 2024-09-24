import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsListProjectsService } from '../../services/settingsListProjects.service';
import { Subject } from 'rxjs';
import { IListSettings } from '../../model/listSettings.interface';

@Component({
  selector: 'app-start-settings',
  templateUrl: './start-settings.component.html',
  styleUrl: './start-settings.component.scss'
})
export class StartSettingsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public listSettings: IListSettings[];
  public isActive: boolean[] = [];

  constructor(
    private settingsListProjects: SettingsListProjectsService
  ) { }

  ngOnInit(): void {
    this.initializeListSettingsFromService();
  }

  private initializeListSettingsFromService() {
    this.listSettings = this.settingsListProjects._listSettings;
  }

  public choicePage(id: number) {
    this.isActive[id] = !this.isActive[id]
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
