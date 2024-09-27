import { createAction, props } from "@ngrx/store";
import { IFolder } from "../../modules/drafts/@shared/models/folder.interface";

const SETCHANGESTOFOLDER = "SETCHANGESTOFOLDER";
const SETNEWFOLDER = "SETNEWFOLDER";
const SETACTIVEFOLDER = "SETACTIVEFOLDER";

interface AllFoders {
  key: IFolder
}

export const setChangesToFolder = createAction(
  SETCHANGESTOFOLDER,
  props<{ value: any }>()
)

export const setNewFolder = createAction(
  SETNEWFOLDER,
  props<{ value: IFolder[] }>()
)

export const setActiveFolder = createAction(
  SETACTIVEFOLDER,
  props<{ value: IFolder }>()
)