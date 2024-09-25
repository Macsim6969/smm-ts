import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { environment } from "../../../../../environment/environment";
import { StoreInterface } from "../../../../store/model/store.model";
import { Store } from "@ngrx/store";
import { setChangesToFolder } from "../../../../store/actions/drafts.action.";



@Injectable()

export class DraftsApiService {

  private db = getDatabase(initializeApp(environment.firebaseConfig));
  private activeDraftsFolder: string;

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>
  ) {
    this.watchForChanges();
  }

  public setChangesToFolderData(data: string) {
    this.http.put<string>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts/bbc.json`, { data }).subscribe();
  }

  public getChangesToFolderData(data: string) {
    this.http.get<string>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts/bbc.json`).subscribe(() =>{

    });
  }



  private watchForChanges() {
    const draftstRef = ref(this.db, 'dlf4-345/drafts-folders');
    const draftsIdtRef = ref(this.db, `dlf4-345/drafts/bbc`);

    onValue(draftsIdtRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.store.dispatch(setChangesToFolder({ value: Object.values(data) }))
      }
    });
  }

}