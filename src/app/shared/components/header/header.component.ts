import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPages } from '../../model/pages.interface';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../store/model/store.model';
import { selectUserProjects } from '../../../store/selectors/store.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public pagestArray: IPages[] = null;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.streamToNewProjectFromService();
  }

  private streamToNewProjectFromService() {
    this.store.pipe(select(selectUserProjects), takeUntil(this.destroy$))
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
