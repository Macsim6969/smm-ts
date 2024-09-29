import { createAction, props } from "@ngrx/store";
import { IUser } from "../../modules/project/@shared/model/users.interface";

const ADDEDUSERS = "ADDEDUSERS";

export const addedNewUsers = createAction(
  ADDEDUSERS,
  props<{ value: IUser[] }>()
)
