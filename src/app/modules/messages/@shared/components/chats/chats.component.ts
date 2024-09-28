import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { IChats } from '../../models/chats.inteface';
import { selectActiveChat, selectMessagesChat } from '../../../../../store/selectors/store.selectors';
import { MessagesApiService } from '../../../../../api/messagesApi.service';
import { ActivatedRoute } from '@angular/router';
import { setActiveChatsData } from '../../../../../store/actions/messages.action';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public chatsData: IChats[];
  private activeChats: string;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private messagesApi: MessagesApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.checkToActiveChat();
    this.streamToChats();
  }

  private checkToActiveChat() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data['id']) {
        this.store.dispatch(setActiveChatsData({ value: data['id'] }));
      }
    });
  }

  private streamToChats() {
    combineLatest(([this.store.pipe(select(selectActiveChat)), this.store.pipe(select(selectMessagesChat))])).pipe(takeUntil(this.destroy$))
      .subscribe(([activeChat, chatsData]) => {
        this.chatsData = chatsData;
        this.activeChats = activeChat;
      })
  }

  public create() {
    const newData: IChats[] = [
      { createDate: new Date(), key: `${this.activeChats}-Macs`, message: "asdasdasd", userCreate: "Macs" }
    ]
    this.messagesApi.setChangesMessagesData(this.activeChats, newData);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
