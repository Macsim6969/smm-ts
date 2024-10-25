import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiagramService {
  constructor(private http: HttpClient) {}

  public sendDiagramLogic(data: any) {
    console.log({ data: data });
    if (!data || Object.keys(data).length === 0) {
      console.error('No data to send. Please check the data structure.');
      return false;
    }

    return this.http
      .put(
        'https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/diagram.json',
        { data: Object.values(data) }
      )
      .subscribe();
  }
}
