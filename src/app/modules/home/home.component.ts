import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsFilePopupSettingsService } from '../../shared/services/isFilesPopupSettings.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public isOpenPopup!: boolean;


  /////
  pageName: string | undefined;
  constructor(
    private IsFilePopupSettings: IsFilePopupSettingsService
  ) { }

  ngOnInit(): void {
    this.streamOpenPopup();
  }

  private streamOpenPopup() {
    this.IsFilePopupSettings._isOpenPopup$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isOpenPopup = data;
    })
  }

  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
