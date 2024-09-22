import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IsFilePopupSettingsService } from './shared/services/isFilesPopupSettings.service';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenPopup: boolean;

  constructor(
    private IsFilePopupSettings: IsFilePopupSettingsService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.streamToChangeOpenPopup();
    this.apiService.getNewProject();
  }
  private streamToChangeOpenPopup() {
    this.IsFilePopupSettings._isOpenPopup$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isOpenPopup = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
