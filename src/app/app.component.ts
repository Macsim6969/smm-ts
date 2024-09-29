import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { StoreInterface } from './store/model/store.model';
import { startGetData } from './store/actions/store.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      console.log(data['key']);
    })
  }

}
