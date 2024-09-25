import { IPages } from './../../shared/model/pages.interface';
import { createAction, props } from "@ngrx/store"

const SETALLPROJECTS = "SETALLPROJECTS";
const LOADPAGESLIST = "LOADPAGESLIST";
const LOADDATA = "LOADDATA";
const SETACTIVEPROJECT = "SETACTIVEPROJECT";

export const startGetData = createAction(
  LOADDATA
)

export const SetActiveProject = createAction(
  SETACTIVEPROJECT,
  props<{ value: string }>()
)

export const SetAllProjects = createAction(
  SETALLPROJECTS,
  props<{ value: IPages[] }>()
)

export const loadPagesList = createAction(
  LOADPAGESLIST,
  props<{ value: string[] }>()
)



