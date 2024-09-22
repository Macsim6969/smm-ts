import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public isOpenPopup!: boolean;


  pageName: string | undefined;
  constructor(

  ) { }

  ngOnInit(): void {
  }

  

  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
