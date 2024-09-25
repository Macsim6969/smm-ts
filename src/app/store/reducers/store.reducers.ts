import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { loadPagesList, SetActiveProject, SetAllProjects } from "../actions/store.actions";



export const store: StoreInterface = {
  isLogin: false,
  activeProject: null,
  userProjects: [],
  pagesSidebarList: []

}

export const storeReducers = createReducer(store,
  on(SetActiveProject, (state, action) => {
    return { ...state, activeProject: action.value }
  }),
  on(SetAllProjects, (state, action) => {
    return { ...state, userProjects: action.value }
  }),
  on(loadPagesList, (state, action) => {
    return { ...state, pagesSidebarList: action.value }
  })

)
