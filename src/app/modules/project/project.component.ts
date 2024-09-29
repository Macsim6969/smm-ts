import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsListProjectsService } from './@shared/services/settingsListProjects.service';
import { Subject, takeUntil } from 'rxjs';
import { AddedUserService } from './@shared/services/addedUser.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenPopup: boolean;
  public isOpenCreateLinkPopup: boolean;
  constructor(
    private settingsListProjects: SettingsListProjectsService,
    private addedUser: AddedUserService
  ) { }

  ngOnInit(): void {
    this.streamToOpenSettingsPopup();
    this.streamToOpenAddedUserPopup();
  }

  private streamToOpenSettingsPopup() {
    this.settingsListProjects._isOpenSettings$.pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => {
        this.isOpenPopup = data;
      })
  }

  private streamToOpenAddedUserPopup() {
    this.addedUser._isOpenPopup$.pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => {
        this.isOpenCreateLinkPopup = data;
      })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
