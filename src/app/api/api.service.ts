import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPages } from "../shared/model/pages.interface";
import { PageManagementService } from "../shared/services/pageManagment.service";
import { take } from "rxjs";


@Injectable()

export class ApiService {

  constructor(
    private http: HttpClient,
    private pageManagment: PageManagementService
  ) { }

  public setNewProject(newProj: IPages) {
    this.http.post<IPages>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json`, newProj).pipe(take(1)).subscribe((data: IPages) => {
      console.log(data);
      this.pageManagment._pages = data[0];
    })
  }

  public getNewProject(){
    this.http.get<IPages[]>("https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json").subscribe((data: IPages[]) =>{
      if(data){
        this.pageManagment._streamPages = Object.values(data);
      }
    })
  }
}