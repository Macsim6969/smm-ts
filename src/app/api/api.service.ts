import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPages } from "../shared/model/pages.interface";
import { Router } from "@angular/router";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { environment } from "../../environment/environment";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../store/model/store.model";
import { loadPagesList, SetAllProjects } from "../store/actions/store.actions";
import { IListPages } from "../modules/project/@shared/model/listSettings.interface";
import { selectActiveProject } from "../store/selectors/store.selectors";


@Injectable()

export class ApiService {

  private db = getDatabase(initializeApp(environment.firebaseConfig));
  private activePage: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ store: StoreInterface }>
  ) {
    this.watchForChanges();

  }

  public setNewProject(newProj: IPages, route: string) {
    this.http.post<IPages>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json`, newProj).subscribe(() => {
      this.router.navigate([`/${route}`]).then();
    })
  }

  public getNewProject() {
    this.http.get<IPages[]>("https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/projects.json").subscribe((data: IPages[]) => {
      if (data) {
        this.store.dispatch(SetAllProjects({ value: Object.values(data) }))
      }
    })
  }


  public setSidebarList(listPages: IListPages, projectKey: string) {
    this.http.post<IListPages>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/project-pages/${projectKey}.json`, listPages).subscribe(() => {
      this.getSidebarList(projectKey);
    });
  }

  public getSidebarList(projectKey: string) {
    this.http.get<IListPages>(`https://smm-st-19042-default-rtdb.firebaseio.com/dlf4-345/project-pages/${projectKey}.json`).subscribe((data: IListPages) => {
      if (data && Object.values(data)) {
        this.store.dispatch(loadPagesList({ value: Object.values(Object.values(data)[0])[0]['key'] }))
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