import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { environment } from "../../../../../environment/environment";
import { StoreInterface } from "../../../../store/model/store.model";
import { select, Store } from "@ngrx/store";
import { setChangesToFolder, setNewFolder } from "../../../../store/actions/drafts.action.";
import { IFolder } from "../models/folder.interface";
import { selectActiveFolders, selectFolders } from "../../../../store/selectors/store.selectors";

@Injectable()

export class DraftsApiService {

  private db = getDatabase(initializeApp(environment.firebaseConfig));
  private activeDraftsFolder: IFolder;

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>
  ) {
    this.streamToActiveFoldersAndData();
    this.watchForChanges();
  }

  private streamToActiveFoldersAndData() {
    this.store.pipe(select(selectActiveFolders))
      .subscribe((data: IFolder) => {
        this.activeDraftsFolder = data;
        this.getChangesToFolderData(this.activeDraftsFolder?.key);
      })
  }

  public setChangesToFolderData(key: string, data: string) {
    this.http.put<string>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts/${key}.json`, { data }).subscribe();
  }

  public getChangesToFolderData(key: string) {
    this.http.get<string>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts/${key}.json`).subscribe((data: string) => {
      if (data && Object.values(data)) {
        this.store.dispatch(setChangesToFolder({ value: Object.values(data) }))
      } else {
        this.store.dispatch(setChangesToFolder({ value: data }))
      }
    });
  }

  public setNewFoldersToProject(data: IFolder) {
    this.http.put<IFolder>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts-folders/${data.key}.json`, data).subscribe();
  }

  public getNewFoldersToProject(data: IFolder) {
    this.http.get<IFolder>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts-folders/${data.key}.json`).subscribe();
  }

  public getAllFoldersFromProject() {
    this.http.get<IFolder[]>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/drafts-folders.json`).subscribe((data: IFolder[]) => {
      this.store.dispatch(setNewFolder({ value: data }));
    });
  }



  private watchForChanges() {
    const draftstFoldersRef = ref(this.db, `dlf4-345/drafts-folders`);
    const draftsIdtRef = ref(this.db, `dlf4-345/drafts/${this.activeDraftsFolder?.key}`);

    onValue(draftsIdtRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.store.dispatch(setChangesToFolder({ value: Object.values(data) }))
      }
    });

    onValue(draftstFoldersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.store.dispatch(setNewFolder({ value: data }));
      }
    })
  }

}