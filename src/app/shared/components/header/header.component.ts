import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsFilePopupSettingsService } from '../../services/isFilesPopupSettings.service';
import { PageManagementService } from '../../services/pageManagment.service';
import { IPages } from '../../model/pages.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public pagestArray: IPages[];

  constructor(
    private IsFilePopupSettings: IsFilePopupSettingsService,
    private pageManagment: PageManagementService
  ) { }

  ngOnInit(): void {
    this.streamToNewProjectFromService();
  }

  private streamToNewProjectFromService() {
    this.pageManagment._streamPages$.pipe(takeUntil(this.destroy$))
      .subscribe((data: IPages[]) => {
        this.pagestArray = data;
      })
  }

  public openPopup() {
    this.IsFilePopupSettings._isOpenPopup = true;
  }

  ngOnDestroy(): void {

  }
}
