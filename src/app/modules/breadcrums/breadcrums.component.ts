import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BreadcrumsService } from '../../shared/services/breadcrums.service';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.scss'
})
export class BreadcrumsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public routeArray: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumsService: BreadcrumsService

  ) { }

  ngOnInit(): void {
    this.streamActivaPage();
    this.streamGetBreadcumsDataFromService();
  }

  private streamActivaPage() {
    this.route.params.subscribe((data) => {
      this.routeArray.push(data['id']);
      this.breadcrumsService.urlLine = data['id'];
    });

  }

  private streamGetBreadcumsDataFromService() {
    this.breadcrumsService.urlLine$.pipe(takeUntil(this.destroy$))
      .subscribe((data: string[]) => {
        this.routeArray = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
