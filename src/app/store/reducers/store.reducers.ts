import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { SetAllProjects } from "../actions/store.actions";



export const store: StoreInterface = {
  isLogin: false,
  userProjects: []
  
}

export const storeReducers = createReducer(store,
  on(SetAllProjects, (state, action) => {
    return { ...state, userProjects: action.value }
  })

)
