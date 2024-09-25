import { createAction, props } from "@ngrx/store";

const SETCHANGESTOFOLDER = "SETCHANGESTOFOLDER";

export const setChangesToFolder = createAction(
  SETCHANGESTOFOLDER,
  props<{ value: any }>()
)