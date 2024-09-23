import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPages } from "../shared/model/pages.interface";
import { Router } from "@angular/router";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { environment } from "../../environment/environment";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../store/model/store.model";
import { SetAllProjects } from "../store/actions/store.actions";


@Injectable()

export class ApiService {
  private db = getDatabase(initializeApp(environment.firebaseConfig));

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ store: StoreInterface }>
  ) {
    this.watchForChanges();
  }

  public setNewProject(newProj: IPages, route: string) {
    this.http.post<IPages>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json`, newProj).subscribe((data: IPages) => {

      this.router.navigate([`/${route}`]).then();
      this.getNewProject();
    })
  }

  public getNewProject() {
    this.http.get<IPages[]>("https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json").subscribe((data: IPages[]) => {
      if (data) {
        this.store.dispatch(SetAllProjects({ value: Object.values(data) }))
      }
    })
  }

  private watchForChanges() {
    const projectRef = ref(this.db, 'dlf4-345/projects');

    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.store.dispatch(SetAllProjects({ value: Object.values(data) }))
      }
    });
  }

}