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
  public isActive: boolean[][] = [];

  public newList: any[] = [];

  constructor(
    private settingsListProjects: SettingsListProjectsService
  ) { }

  ngOnInit(): void {
    this.initializeListSettingsFromService();
  }

  private initializeListSettingsFromService() {
    this.listSettings = this.settingsListProjects._listSettings;

    this.listSettings.forEach(list => {
      this.isActive.push(Array(list.listContent.length).fill(false));
    });
  }

  public choicePage(listIndex: number, itemIndex: number, key: string) {
    this.isActive[listIndex][itemIndex] = !this.isActive[listIndex][itemIndex];

    if (this.newList.includes(key)) {
      this.newList = this.newList.filter((data) => data !== key)
    } else {
      this.newList.push(key);
    }
    this.settingsListProjects._choiceActivePage = this.newList;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
