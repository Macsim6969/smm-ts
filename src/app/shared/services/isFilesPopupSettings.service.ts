import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable()

export class IsFilePopupSettingsService {

  private isOpenPopup$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isOpenPopup(newValue: boolean) {
    this.isOpenPopup$.next(newValue);
  }

  get _isOpenPopup$() {
    return this.isOpenPopup$;
  }
}