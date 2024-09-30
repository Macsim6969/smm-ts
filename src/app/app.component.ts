import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { StoreInterface } from './store/model/store.model';
import { ActivatedRoute } from '@angular/router';
import { AddedUserApiService } from './api/addedUserApi.service';
import { IUser } from './modules/project/@shared/model/users.interface';
import { selectUsers } from './store/selectors/store.selectors';
import { useGuest } from './store/actions/users.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private allGuestsUsers: IUser[] = [];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private addedUserApi: AddedUserApiService
  ) { }

  ngOnInit(): void {
    this.addedUserApi.getAllChatsProject();
    this.getAllGuestsUsers();
  }

  private getAllGuestsUsers() {
    this.store.pipe(select(selectUsers)).subscribe((data) => {
      if (Array.isArray(data)) {
        this.allGuestsUsers = data;
        this.checkToUseKey();
      } else {
        console.error("Expected an array of users, but received: ", data);
      }
    });
  }


  private checkToUseKey() {
    this.route.queryParams.subscribe((data) => {
      data['key'] ? this.checkToActiveGusts(data['key']) : '';
    })
  }

  private checkToActiveGusts(key: string) {
    let data = (this.allGuestsUsers as any).find((data: IUser) => data.key === key);
    console.log(data, key);

    if (localStorage.getItem('GustsKey')) {
      this.store.dispatch(useGuest({ value: data }));
    } else {
      this.store.dispatch(useGuest({ value: data }));
      localStorage.setItem('GustsKey', JSON.stringify(data.key));
    }
  }

}
