import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { Subject, takeUntil } from 'rxjs';
import { IChats } from '../../models/chats.inteface';
import { selectMessagesChat } from '../../../../../store/selectors/store.selectors';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public chatsData: IChats[];

  constructor(
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamToChats();
  }

  private streamToChats() {
    this.store.pipe(select(selectMessagesChat), takeUntil(this.destroy$))
      .subscribe((data: IChats[]) => {
        this.chatsData = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
