import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageManagementService } from '../../services/pageManagment.service';
import { IPages } from '../../model/pages.interface';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public pagestArray: IPages[] = null;

  constructor(
    private pageManagment: PageManagementService,
    private router: Router
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
    this.router.navigate(['/start']).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
