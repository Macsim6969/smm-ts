import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsListProjectsService } from './@shared/services/settingsListProjects.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenPopup: boolean;
  constructor(
    private settingsListProjects: SettingsListProjectsService
  ) { }

  ngOnInit(): void {
    this.streamToOpenSettingsPopup();
  }

  private streamToOpenSettingsPopup() {
    this.settingsListProjects._isOpenSettings$.pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => {
        this.isOpenPopup = data;
      })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
