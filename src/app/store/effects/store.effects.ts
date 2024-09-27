import { ApiService } from './../../api/api.service';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { Injectable } from "@angular/core";
import { tap, withLatestFrom } from "rxjs";
import { SetActiveProject, startGetData } from "../actions/store.actions";
import { selectActiveProject } from '../selectors/store.selectors';

@Injectable()
export class AuthEffects {


  startAuth = createEffect(
    () => this.actions$.pipe(
      ofType(SetActiveProject),
      withLatestFrom(this.store.pipe(select(selectActiveProject))),
      tap(([action, id]) => {
        this.apiService.getNewProject();
      })
    )
    ,
    { dispatch: false }
  );

  checkToChangeProject = createEffect(
    () => this.actions$.pipe(
      ofType(SetActiveProject),
      withLatestFrom(this.store.pipe(select(selectActiveProject))),
      tap(([action, id]) => {
        this.apiService.getSidebarList(id);
      })
    )
    ,
    { dispatch: false }
  );

  constructor(private actions$: Actions,
    private store: Store<{ store: StoreInterface }>,
    private apiService: ApiService
  ) { }

}