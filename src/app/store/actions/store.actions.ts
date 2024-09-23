import { IPages } from './../../shared/model/pages.interface';
import { createAction, props } from "@ngrx/store"

const SETALLPROJECTS = "SETALLPROJECTS"

export const SetAllProjects = createAction(
  SETALLPROJECTS,
  props<{value: IPages[]}>()
)



