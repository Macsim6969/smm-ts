import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPages } from '../model/pages.interface';

@Injectable()
export class PageManagementService {
  private pages: IPages[] = [];
  private _pagesSubject: BehaviorSubject<IPages[]> = new BehaviorSubject<IPages[]>(null);


  set _pages(newPage: IPages) {
    this.pages.push(newPage);
    console.log(this.pages);
  }

  get _pages(): IPages[] {
    return this.pages
  }

  get _streamPages$() {
    this._pagesSubject.next(this.pages);
    return this._pagesSubject;
  }



}
