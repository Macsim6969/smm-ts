import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChatsList } from '../../models/chats.inteface';
import { MessagesApiService } from '../../../../../api/messagesApi.service';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMessagesLists } from '../../../../../store/selectors/store.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private slider: HTMLElement | null = null;
  public newChat: string;
  public isNewCreate: boolean;
  public messagesLists: IChatsList[];

  constructor(
    private messagesApi: MessagesApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamToChatsListsFromStore();
  }

  private streamToChatsListsFromStore() {
    this.store.pipe(select(selectMessagesLists)).pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.messagesLists = data;
      })
  }

  public createNewChat() {
    this.isNewCreate = true;
  }

  public saveChat() {
    const newData: IChatsList = {
      key: `${this.newChat}`,
      title: this.newChat,
      route: `/${this.newChat}`
    }
    this.isNewCreate = false;
    this.messagesApi.createNewChats(newData);
  }

  public onMouseDown(event: MouseEvent) {
    this.slider = event.currentTarget as HTMLElement;
    this.isDown = true;
    this.slider.classList.add('active');
    this.startX = event.pageX - this.slider.offsetLeft;
    this.scrollLeft = this.slider.scrollLeft;
  }

  public onMouseUp() {
    this.isDown = false;
    if (this.slider) {
      this.slider.classList.remove('active');
    }
    this.slider = null;
  }

  public onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;

    event.preventDefault();
    const x = event.pageX - (this.slider?.offsetLeft || 0);
    const walk = (x - this.startX) * 1.5; // Регулируем скорость

    if (this.slider) {
      this.slider.scrollLeft = this.scrollLeft - walk;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}