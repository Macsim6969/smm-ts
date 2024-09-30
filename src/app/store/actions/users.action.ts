import { createAction, props } from "@ngrx/store";
import { IUser } from "../../modules/project/@shared/model/users.interface";

const ADDEDUSERS = "ADDEDUSERS";
const USEGUESTS = "USEGUESTS";

export const addedNewUsers = createAction(
  ADDEDUSERS,
  props<{ value: IUser[] }>()
)

export const useGuest = createAction(
  USEGUESTS,
  props<{ value: IUser }>()
)
