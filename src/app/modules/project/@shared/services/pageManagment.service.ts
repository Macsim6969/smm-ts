// page-management.service.ts
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPages } from '../model/pages.interface';

@Injectable()
export class PageManagementService {
  private pages: IPages[] = [];


  set _pages(newPage: IPages) {
    this.pages.push(newPage);
    console.log(this.pages);
  }

  get _pages(): IPages[]{
    return this.pages
  }



}
