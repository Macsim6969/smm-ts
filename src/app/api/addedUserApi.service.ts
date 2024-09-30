import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../store/model/store.model";
import { IUser } from "../modules/project/@shared/model/users.interface";
import { addedNewUsers } from "../store/actions/users.action";

@Injectable()

export class AddedUserApiService {

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>
  ) { }

  public getAllChatsProject() {
    this.http.get<IUser[]>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/users.json`).subscribe((data: IUser[]) => {
      this.store.dispatch(addedNewUsers({ value: Object.values(data) }))
    });
  }


  public setChangesMessagesData(data: IUser) {
    this.http.post<IUser>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/users.json`, data).subscribe().add(() => {
      this.getAllChatsProject();
    });
  }



}