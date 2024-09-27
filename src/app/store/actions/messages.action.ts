import { createAction, props } from "@ngrx/store";
import { IChats, IChatsList } from "../../modules/messages/@shared/models/chats.inteface";

const SETNEWCHATS = "SETNEWCHATS";
const SETDATATOCHATS = "SETDATATOCHATS";
const SETACTIVECHATS = "SETACTIVECHATS";

export const setNewChats = createAction(
  SETNEWCHATS,
  props<{ value: IChatsList[] }>()
)

export const setChatsData = createAction(
  SETDATATOCHATS,
  props<{ value: IChats[] }>()
)

export const setActiveChatsData = createAction(
  SETACTIVECHATS,
  props<{ value: string }>()
)