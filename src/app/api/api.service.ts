import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPages } from "../shared/model/pages.interface";
import { PageManagementService } from "../shared/services/pageManagment.service";
import { take } from "rxjs";
import { Router } from "@angular/router";


@Injectable()

export class ApiService {

  constructor(
    private http: HttpClient,
    private pageManagment: PageManagementService,
    private router: Router
  ) { }

  public setNewProject(newProj: IPages, route: string) {
    this.http.post<IPages>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json`, newProj).subscribe((data: IPages) => {
      this.pageManagment._pages = data[0];
      this.router.navigate([`/${route}`]).then();
      this.getNewProject();
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