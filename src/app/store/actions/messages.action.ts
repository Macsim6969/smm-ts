import { createAction, props } from "@ngrx/store";
import { IFolder } from "../../modules/drafts/@shared/models/folder.interface";
import { IChats, IChatsList } from "../../modules/messages/@shared/models/chats.inteface";

const SETNEWCHATS = "SETNEWCHATS";
const SETDATATOCHATS = "SETDATATOCHATS";

export const setNewChats = createAction(
  SETNEWCHATS,
  props<{ value: IChatsList[] }>()
)

export const setChatsData = createAction(
  SETDATATOCHATS,
  props<{ value: IChats[] }>()
)