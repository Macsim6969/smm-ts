import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class BreadcrumsService {
  private _urlLines: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private urlArray: string[] = [];

  set urlLine(newArray: string) {
    this.urlArray.push(newArray);
    this._urlLines.next(this.urlArray);
  }

  get urlLine$() {
    return this._urlLines;
  }
}