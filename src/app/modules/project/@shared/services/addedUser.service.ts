import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class AddedUserService {
  private isOpenPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isOpenPopup(newData: boolean) {
    this.isOpenPopupSubject.next(newData);
  }

  get _isOpenPopup$() {
    return this.isOpenPopupSubject;
  }
}