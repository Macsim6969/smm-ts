import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

import { select, Store } from "@ngrx/store";
import { environment } from "../../environment/environment";
import { selectActiveChat } from "../store/selectors/store.selectors";
import { StoreInterface } from "../store/model/store.model";
import { setChatsData, setNewChats } from "../store/actions/messages.action";
import { IChats, IChatsList } from "../modules/messages/@shared/models/chats.inteface";

@Injectable()

export class MessagesApiService {

  private db = getDatabase(initializeApp(environment.firebaseConfig));
  private activeDraftsFolder: string;

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>
  ) {
    this.streamToActiveFoldersAndData();
    this.watchForChanges();
  }

  private streamToActiveFoldersAndData() {
    this.store.pipe(select(selectActiveChat))
      .subscribe((data: string) => {
        this.activeDraftsFolder = data;
        this.getChangesToFolderData(this.activeDraftsFolder);
      })
  }

  public createNewChats(data: IChatsList) {
    this.http.put<string>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/messagesLists/${data.key}.json`, data).subscribe();
  }

  public getChangesToFolderData(key: string) {
    this.http.get<IChatsList>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/messagesLists/${key}.json`).subscribe((data: IChatsList) => {
      if (data && Object.values(data)) {
        this.store.dispatch(setNewChats({ value: Object.values(data) }))
      } else {
        this.store.dispatch(setNewChats({ value: null }))
      }
    });
  }

  public getAllChatsProject() {
    this.http.get<IChatsList[]>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/messagesLists.json`).subscribe((data: IChatsList[]) => {
      this.store.dispatch(setNewChats({ value: data }))
    });
  }


  public setChangesMessagesData(key: string, data: IChats[]) {
    this.http.put<IChats[]>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/messages-chats/${key}.json`, { data }).subscribe();
  }

  public getChangesMessagesData(key: string) {
    this.http.get<IChats[]>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/messages-chats/${key}.json`).subscribe((data: IChats[]) => {
      if (data && Object.values(data)) {
        this.store.dispatch(setChatsData({ value: Object.values(data) }))
      } else {
        this.store.dispatch(setChatsData({ value: data }))
      }
    });
  }


  private watchForChanges() {
    const MessagesListRef = ref(this.db, `dlf4-345/messagesLists/`);
    const MessagesChatsRef = ref(this.db, `dlf4-345/messages-chats/`);

    onValue(MessagesListRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.store.dispatch(setNewChats({ value: Object.values(data) }))
      }
    });

    onValue(MessagesChatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.store.dispatch(setChatsData({ value: Object.values(data) }))
      }
    });
  }

}